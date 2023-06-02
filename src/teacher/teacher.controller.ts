import { Controller, Get, Post, Body } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher-dto';

@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get()
  getAllTeachers() {
    return this.teacherService.getAllTeachers();
  }

  @Post()
  createTeacher(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.createTeacher(createTeacherDto);
  }

  // Add other routes and methods as needed
}
