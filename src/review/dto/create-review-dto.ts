import { IsInt, Min, Max, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @IsInt()
  @Min(1)
  @Max(10)
  @IsNotEmpty()
  @ApiProperty()
  difficulty: number;

  @IsInt()
  @Min(1)
  @Max(10)
  @IsNotEmpty()
  @ApiProperty()
  gain: number;

  @IsInt()
  @Min(1)
  @Max(10)
  @IsNotEmpty()
  @ApiProperty()
  rate: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  courseId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  authorId: number;

  @IsNotEmpty()
  @ApiProperty()
  content: string;
}
