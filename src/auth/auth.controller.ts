import { Controller, Request, Post, UseGuards, Get, Body,ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return req.session;
  }
  
  @Post('auth/register')
  async registerUser(@Body() createUserDto: CreateUserDto, @Request() req) {
    const existingUser = await this.userService.findOne(createUserDto.username);
    if (existingUser) {
      throw new ConflictException('Email already taken');
    }
    const result = await this.authService.registerUser(createUserDto);
    if (result.user) {
      req.login(result.user, function (err) {
        if (err) {
          throw new Error('Sorry, something went wrong. We could register but not sign you in.');
        }
        return req.session;
      });
    }
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
