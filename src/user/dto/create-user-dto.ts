import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ContainsChinese } from '../../vaildator/vaildators';

export class CreateUserDto {
  @IsNotEmpty()
  @ContainsChinese()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsEmail()
  @ApiProperty()
  email: string;
}
