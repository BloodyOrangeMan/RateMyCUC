import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherModule } from '../teacher/teacher.module';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Course } from './entities/course.entity';
import { Review } from '../review/entities/review.entity';
import { Teacher } from '../teacher/entities/teacher.entity';
import { TagService } from './tag.service';
import { Tag } from './entities/tag.entity';
import { CourseTag } from './entities/course-tag.entity';
import { User } from 'src/user/entities/user.entity';
import { UserUpvoteTag } from './entities/user-upvote';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Course,
      Review,
      Teacher,
      Tag,
      CourseTag,
      User,
      UserUpvoteTag,
    ]),
    TeacherModule,
  ],
  controllers: [CourseController],
  providers: [CourseService, TagService],
  exports: [CourseService],
})
export class CourseModule {}
