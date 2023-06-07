import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from '../user/dto/create-user-dto';
import { LoggedInGuard } from './guards/local.guard';
import { LoginDto } from '../user/dto/login-dto';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiOperation({ summary: 'Log in' })
  @ApiResponse({ status: 200, description: 'Logged in successfully.' })
  @ApiBody({ type: LoginDto })
  async login(@Request() req) {
    return req.session;
  }

  @Post('auth/register')
  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiBody({ type: CreateUserDto })
  async registerUser(@Body() createUserDto: CreateUserDto, @Request() req) {
    const result = await this.authService.registerUser(createUserDto);
    return new Promise((resolve, reject) => {
      if (result.user) {
        req.login(result.user, function (err) {
          if (err) {
            reject(new Error('Sorry, something went wrong. We could register but not sign you in.'));
          } else {
            resolve(req.session);
          }
        });
      } else {
        reject(new Error('User registration failed.'));
      }
    });
  }

  @UseGuards(LoggedInGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully.' })
  getProfile(@Request() req) {
    return req.user;
  }
}
