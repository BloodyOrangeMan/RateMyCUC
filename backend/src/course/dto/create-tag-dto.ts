import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({ example: 'Easy' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(12, {
    message: 'Tag name is too long. Maximum is 12 characters.',
  })
  tagName: string;
}
