import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ContainsChinese } from '../isCJK/vaildators';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsNumber()
  classID: number;

  @IsNotEmpty()
  @IsString()
  @ContainsChinese()
  courseName: string;

  @IsNotEmpty()
  @IsString()
  @ContainsChinese()
  limitDesc: string;

  @IsNotEmpty()
  @IsString()
  @ContainsChinese()
  departmentName: string;

  @IsNotEmpty()
  @IsString()
  @ContainsChinese()
  courseTypeName: string;

  @IsNotEmpty()
  @IsString()
  @ContainsChinese()
  teacherName: string;

  @IsNotEmpty()
  @IsNumber()
  credit: number;

  @IsNotEmpty()
  @IsNumber()
  hours: number;
}
