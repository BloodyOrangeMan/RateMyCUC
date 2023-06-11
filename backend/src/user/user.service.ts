import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user): Promise<User> {
    const { username, email, password } = user;

    const newUser = await this.usersRepository.create({
      email,
      username,
      password,
    });
    const result = await this.usersRepository.save(newUser);
    return result;
  }
  async findById(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }
  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username });
  }
  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ email });
  }
}
