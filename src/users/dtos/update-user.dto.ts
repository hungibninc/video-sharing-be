import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    type: String,
    description: 'This is an optional property',
    default: 'my-password',
  })
  @IsString()
  @IsOptional()
  password: string;
}
