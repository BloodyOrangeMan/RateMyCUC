import { IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsNotEmpty()
  @ApiProperty()
  @Matches(/^[\w-]+(\.[\w-]+)*@cuc\.edu\.cn$/, {
    message: 'Email must end with @cuc.edu.cn',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
