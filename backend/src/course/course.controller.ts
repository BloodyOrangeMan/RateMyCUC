import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Request,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { CourseService } from './course.service';
import { Course } from './entities/course.entity';
import { CourseTag } from './entities/course-tag.entity';
import { CreateTagDto } from './dto/create-tag-dto';
import { LoggedInGuard } from 'src/auth/guards/local.guard';

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

  @Get(':id')
  @ApiOperation({ summary: 'Get course by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Returns the course with the specified ID.',
    type: Course,
  })
  async findById(@Param('id') id: number): Promise<Course> {
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      throw new NotFoundException(`Invalid id: ${id}`);
    }
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

  @ApiOperation({ summary: 'Add a tag to a course' })
  @ApiParam({
    name: 'courseId',
    description: 'The ID of the course',
    example: 1,
  })
  @ApiParam({ name: 'tagId', description: 'The ID of the tag', example: 1 })
  @ApiCreatedResponse({
    description: 'The tag has been successfully added to the course.',
    type: CourseTag, // Make sure the CourseTag entity has appropriate ApiProperty decorators
  })
  @Post(':courseId/tags/:tagId')
  addTagToCourse(
    @Param('courseId') courseId: number,
    @Param('tagId') tagId: number,
  ): Promise<CourseTag> {
    return this.courseService.addTagToCourse(courseId, tagId);
  }

  @Delete(':courseId/tags/:tagId')
  removeTagFromCourse(
    @Param('courseId') courseId: number,
    @Param('tagId') tagId: number,
  ): Promise<void> {
    return this.courseService.removeTagFromCourse(courseId, tagId);
  }
  /* 👉 upvoteTagOnCourse */
  @Post(':courseId/tags/:tagId/upvote')
  @UseGuards(LoggedInGuard)
  upvoteTagOnCourse(
    @Param('courseId') courseId: number,
    @Param('tagId') tagId: number,
    @Request() req,
  ): Promise<CourseTag> {
    return this.courseService.upvoteTagOnCourse(req.user.id, courseId, tagId);
  }
  /* 👉 createTagAndAddToCourse */
  @ApiOperation({ summary: 'Create a tag and add it to a course' })
  @ApiParam({
    name: 'courseId',
    description: 'The ID of the course',
    example: 1,
  })
  @ApiBody({
    description: 'The name of the tag to be created and added',
    type: CreateTagDto,
  })
  @ApiCreatedResponse({
    description:
      'The tag has been successfully created and added to the course.',
    type: CourseTag, // Make sure the CourseTag entity has appropriate ApiProperty decorators
  })
  @Post(':courseId/tags')
  createTagAndAddToCourse(
    @Param('courseId') courseId: number,
    @Body() createTagDto: CreateTagDto,
  ): Promise<CourseTag> {
    return this.courseService.createTagAndAddToCourse(
      courseId,
      createTagDto.tagName,
    );
  }
}
