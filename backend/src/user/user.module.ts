import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Review } from 'src/review/entities/review.entity';
import { UserUpvoteTag } from 'src/course/entities/user-upvote';
@Module({
  imports: [TypeOrmModule.forFeature([User, Review, UserUpvoteTag])],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
