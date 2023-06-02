import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateVideoDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
    default: 'https://www.youtube.com/watch?v=yuVVKB0EaOQ',
  })
  @IsString()
  url: string;
}
