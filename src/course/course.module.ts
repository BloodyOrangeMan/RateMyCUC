import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Course } from './entities/course.entity';
import { Review } from 'src/review/entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Review])],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
