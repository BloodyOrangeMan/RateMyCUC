import { Controller, Request, Post, UseGuards, Get, Body,ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserService } from '../user/user.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return req.session;
  }
  
  @Post('auth/register')
  async registerUser(@Body() user, @Request() req) {
    const existingUser = await this.userService.findOne(user.name);
    if (existingUser) {
      throw new ConflictException('Email already taken');
    }
    const result = await this.authService.registerUser(user);
    if (result.user) {
      req.login(result.user, function (err) {
        if (err) {
          throw new Error(
            'Sorry, somethin went wrong. We could register but sign you in.',
          );
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
