import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

//  this is an interface that means any class, basically any class whatsoever, as long as you give a class
interface ClassConstructor {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {

  constructor(private dto: any){}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run something before a request is handled
    // by the request handler
    // console.log('Im running before the handler', context);

    return handler.handle().pipe(
      map((data: any) => {
        // Run something before the response is sent out
        // console.log('Im running before response is sent out', data);
        return plainToClass(this.dto, data, {
          //  This setting says that it only filter the data based on the defined rule in UserDto
          //  If it is false then all other properties of User entity that are not defined in UserDto should be shown
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
