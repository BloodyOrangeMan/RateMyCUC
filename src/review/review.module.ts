import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { UsersModule } from '../user/user.module';
import { CourseModule } from '../course/course.module';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, User]),
    UsersModule,
    CourseModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
