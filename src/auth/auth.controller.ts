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
    if (result.user) {
      req.login(result.user, function (err) {
        if (err) {
          throw new Error(
            'Sorry, something went wrong. We could register but not sign you in.',
          );
        }
        return req.session;
      });
    }
  }

  @UseGuards(LoggedInGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully.' })
  getProfile(@Request() req) {
    return req.user;
  }
}
