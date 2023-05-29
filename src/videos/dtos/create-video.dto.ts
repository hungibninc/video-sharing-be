import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
} from 'class-validator';

export class CreateVideoDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
    default: 'Build Nest.js Microservices',
  })
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
    default: 'we build a complete Nest.js microservices application using RabbitMQ as our distributed fault-tolerant message broker.',
  })
  @IsString()
  desc: string;
  
  @ApiProperty({
    type: String,
    description: 'This is a required property',
    default: 'https://www.youtube.com/watch?v=yuVVKB0EaOQ',
  })
  @IsString()
  url: string;

}
