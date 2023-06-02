import { IsNotEmpty, ArrayNotEmpty, ArrayMinSize } from 'class-validator';

export class CreateTeacherDto {
  @IsNotEmpty()
  teacherName: string;

  @ArrayNotEmpty()
  @ArrayMinSize(1)
  // courseIds: string[];
  courseIds: number[];
}

export class UpdateTeacherDto {
  @IsNotEmpty()
  teacherName: string;

  @ArrayNotEmpty()
  @ArrayMinSize(1)
  // courseIds: string[];
  courseIds: number[];
}
