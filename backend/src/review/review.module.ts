import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { UsersModule } from '../user/user.module';
import { CourseModule } from '../course/course.module';
import { User } from 'src/user/entities/user.entity';
import { Course } from 'src/course/entities/course.entity';
import { UserUpvoteTag } from 'src/course/entities/user-upvote';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, User, Course, UserUpvoteTag]),
    UsersModule,
    CourseModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
