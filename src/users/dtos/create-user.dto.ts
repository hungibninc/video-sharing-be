import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
    default: 'Micheal Jackson',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
    default: 'email@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
    default: 'my-password',
  })
  @IsString()
  password: string;
}
