import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from './entities/course.entity';

@Controller('courses')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post()
  async create(@Body() course: Course): Promise<Course> {
    return this.courseService.create(course);
  }

  @Get()
  async findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @Get('id/:id')
  async findById(@Param('id') id: number): Promise<Course> {
    return this.courseService.findById(id);
  }

  @Get('teacher/:teacherName')
  async findByTeacher(@Param('teacherName') teacherName: string): Promise<Course> {
    return this.courseService.findByTeacher(teacherName);
  }

  @Get('name/:courseName')
  async findByCourseName(@Param('courseName') courseName: string): Promise<Course> {
    return this.courseService.findByCourseName(courseName);
  }


  @Put(':id')
  async update(@Param('id') id: number, @Body() course: Course): Promise<Course> {
    return this.courseService.update(id, course);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.courseService.delete(id);
  }
}