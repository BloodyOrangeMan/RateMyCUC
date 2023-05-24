import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Review } from 'src/review/entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Review])],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
