import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsEmail()
  @ApiProperty()
  @Matches(/^[\w-]+(\.[\w-]+)*@cuc\.edu\.cn$/, {
    message: 'Email must end with @cuc.edu.cn',
  })
  email: string;
}
