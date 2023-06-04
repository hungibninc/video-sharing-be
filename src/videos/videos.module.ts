import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { Video } from './video.entity';
import { VideoGateway } from './video.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([Video]),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [VideosController],
  providers: [VideosService, VideoGateway],
})
export class VideosModule {}
