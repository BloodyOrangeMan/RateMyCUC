import { Injectable,ConflictException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
  
  async registerUser(createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findOne(createUserDto.username);
    if (existingUser) {
      throw new ConflictException('Email already taken');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 8);
    const res = await this.userService.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword,
    });
    delete res.password;

    // TODO: 'Send email.'
    // this.sendEmailVerificationMail(res);

    return {
      user: res,
    };
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}