import { IsString, IsNumber, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  courseId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  authorId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  reviewId: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  upvoteCount: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  downvoteCount: number;
}
