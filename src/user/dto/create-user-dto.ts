import { IsEmail, IsNotEmpty } from 'class-validator';
import { ContainsChinese } from '../../course/isCJK/vaildators';

export class CreateUserDto {

    @IsNotEmpty()
    @ContainsChinese()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsEmail()
    email: string;
  }
  