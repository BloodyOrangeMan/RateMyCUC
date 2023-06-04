import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ContainsChinese } from '../../validators/validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the course.',
  })
  classID: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '030079', description: 'The course number.' })
  courseNumber: string;

  @IsNotEmpty()
  @IsString()
  @ContainsChinese()
  @ApiProperty({ example: '软件工程', description: 'The course name.' })
  courseName: string;

  @IsNotEmpty()
  @IsString()
  @ContainsChinese()
  @ApiProperty({
    example: '限选课程',
    description: 'The course limit description.',
  })
  limitDesc: string;

  @IsNotEmpty()
  @IsString()
  @ContainsChinese()
  @ApiProperty({ example: '计算机学院', description: 'The department name.' })
  departmentName: string;

  @IsNotEmpty()
  @IsString()
  @ContainsChinese()
  @ApiProperty({ example: '学科基础课', description: 'The course type name.' })
  courseTypeName: string;

  @IsNotEmpty()
  @IsString()
  @ContainsChinese()
  @ApiProperty({ example: '张也', description: 'The teacher name.' })
  teacherName: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 2.5, description: 'The credit hours of the course.' })
  credit: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 48, description: 'The total hours of the course.' })
  hours: number;
}
