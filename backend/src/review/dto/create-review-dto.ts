import { Min, Max, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @IsNumber()
  @Min(0)
  @Max(5)
  @IsNotEmpty()
  @ApiProperty({ type: Number, format: 'float', minimum: 0, maximum: 5 })
  difficulty: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  @IsNotEmpty()
  @ApiProperty({ type: Number, format: 'float', minimum: 0, maximum: 5 })
  gain: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  @IsNotEmpty()
  @ApiProperty({ type: Number, format: 'float', minimum: 0, maximum: 5 })
  rate: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  @IsNotEmpty()
  @ApiProperty({ type: Number, format: 'float', minimum: 0, maximum: 5 })
  score: number;

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

  @IsNotEmpty()
  @ApiProperty()
  title: string;
  // @IsInt()
  // @ApiProperty()
  // upvoteCount: number;

  // @IsInt()
  // @ApiProperty()
  // downvoteCount: number;
}
