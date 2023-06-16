import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { CourseModule } from 'src/course/course.module';
import { Course } from 'src/course/entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), CourseModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
