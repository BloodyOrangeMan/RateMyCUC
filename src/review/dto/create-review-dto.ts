import { IsInt, Min, Max, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @Min(1)
  @Max(10)
  @IsNotEmpty()
  difficulty: number;

  @IsInt()
  @Min(1)
  @Max(10)
  @IsNotEmpty()
  gain: number;

  @IsInt()
  @Min(1)
  @Max(10)
  @IsNotEmpty()
  rate: number;

  @IsNotEmpty()
  @IsNumber()
  courseId: number;

  @IsNotEmpty()
  @IsNumber()
  authorId: number;

  @IsNotEmpty()
  content: string;
}
