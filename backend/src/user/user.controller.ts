import { Controller, Get, Put, Body, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user-dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: User/mnt/c/Users/86136/Desktop/RateMyCUC/frontend/src/views/pages/courselist })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getUserProfile(@Req() req): Promise<User> {
    const userId = req.user.id;
    return this.userService.findById(userId);
  }

  @Put('email')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: User, description: ' update email' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  updateEmail(
    @Req() req,
    @Body() updateEmailDto: UpdateUserDto,
  ): Promise<User> {
    const userId = req.user.id;
    return this.userService.updateEmail(userId, updateEmailDto.email);
  }

  @Put('username')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: User, description: ' update username' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  updateUsername(
    @Req() req,
    @Body() updateUsernameDto: UpdateUserDto,
  ): Promise<User> {
    const userId = req.user.id;
    return this.userService.updateUsername(userId, updateUsernameDto.username);
  }

  @Put('password')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: User, description: ' update password' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  updatePassword(
    @Req() req,
    @Body() updatePasswordDto: UpdateUserDto,
  ): Promise<User> {
    const userId = req.user.id;
    return this.userService.updatePassword(userId, updatePasswordDto.password);
  }
}
