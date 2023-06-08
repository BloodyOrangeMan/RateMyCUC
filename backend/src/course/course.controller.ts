import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { CourseService } from './course.service';
import { Course } from './entities/course.entity';

@Controller('courses')
@ApiTags('courses')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post()
  @ApiOperation({ summary: 'Create course' })
  @ApiBody({ type: Course })
  @ApiResponse({
    status: 201,
    description: 'The course has been successfully created.',
    type: Course,
  })
  async create(@Body() course: Course): Promise<Course> {
    return this.courseService.create(course);
  }

  @Get()
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of courses.',
    type: Course,
    isArray: true,
  })
  async findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Get course by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Returns the course with the specified ID.',
    type: Course,
  })
  async findById(@Param('id') id: number): Promise<Course> {
    return this.courseService.findById(id);
  }

  @Get('number/:courseNumber')
  @ApiOperation({ summary: 'Get courses by course number' })
  @ApiParam({ name: 'courseNumber', type: 'string' })
  @ApiResponse({
    status: 200,
    description:
      'Returns an array of courses with the specified course number.',
    type: Course,
    isArray: true,
  })
  async findByNumber(
    @Param('courseNumber') courseNumber: string,
  ): Promise<Course[]> {
    return this.courseService.findByNumber(courseNumber);
  }

  @Get('teacher/:teacherName')
  @ApiOperation({ summary: 'Get courses by teacher name' })
  @ApiParam({ name: 'teacherName', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of courses taught by the specified teacher.',
    type: Course,
    isArray: true,
  })
  async findByTeacher(
    @Param('teacherName') teacherName: string,
  ): Promise<Course[]> {
    return this.courseService.findByTeacher(teacherName);
  }

  @Get('name/:courseName')
  @ApiOperation({ summary: 'Get courses by course name' })
  @ApiParam({ name: 'courseName', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of courses with the specified course name.',
    type: Course,
    isArray: true,
  })
  async findByCourseName(
    @Param('courseName') courseName: string,
  ): Promise<Course[]> {
    return this.courseService.findByCourseName(courseName);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update course by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: Course })
  @ApiResponse({
    status: 200,
    description: 'Returns the updated course.',
    type: Course,
  })
  async update(
    @Param('id') id: number,
    @Body() course: Course,
  ): Promise<Course> {
    return this.courseService.update(id, course);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete course by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 204,
    description: 'The course has been successfully deleted.',
  })
  async delete(@Param('id') id: number): Promise<void> {
    return this.courseService.delete(id);
  }

  @Get('courseList/:departmentName')
  async findCourseList(
    @Param('departmentName') departmentName: string,
  ): Promise<Course[]> {
    return this.courseService.findCourseList(departmentName);
  }
}
