import { Module, ValidationPipe, MiddlewareConsumer } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { VideosModule } from './videos/videos.module';
const cookieSession = require('cookie-session');

import dbConfig = require('../ormconfig');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //  this means that we do not have to reimport the config module all over the place into other modules inside of a project whenever we want to get some config information.
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot(dbConfig),
    UsersModule,
    VideosModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /**
     * move useGlobalPipes from main.ts to app.module.ts to fix issue e2e test
     * object below saying that whenever we create an instance of our AppModule, automatically make use of this thing or take this value right here and apply it to every incoming request that flows into our application
     */
    {
      provide: APP_PIPE, //  every single request that comes into the application, run it through this class in useValue right here
      useValue: new ValidationPipe({
        //  If set to true, validator will strip validated (returned) object of any properties that do not use any validation decorators.
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}

  /**
   * move cookieSession from main.ts to app.module.ts to fix issue e2e test
   * this configure function is going to be called automatically whenever our application starts listing for incoming traffic.
   * here we set up some middleware that will run on every single incoming request.
   */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          //  asdfasfd string is going to be used to encrypt the information that is stored inside the cookie
          keys: [this.configService.get('COOKIE_KEY')],
          secure: true,
          sameSite: 'none',
          maxAge: 24 * 60 * 60 * 1000, // 24 hours
        }),
      )
      .forRoutes('*'); //  this means that we want to make use of this middleware on every single incoming request that flows into our entire application.
  }
}
