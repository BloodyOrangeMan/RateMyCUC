import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherModule } from '../teacher/teacher.module';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Course } from './entities/course.entity';
import { Review } from '../review/entities/review.entity';
import { Teacher } from '../teacher/entities/teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Review, Teacher]), TeacherModule],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
