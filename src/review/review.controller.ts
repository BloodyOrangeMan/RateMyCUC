import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review-dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @Get()
  async findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.reviewService.findById(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: CreateReviewDto,
  ) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.reviewService.delete(+id);
  }

  @Patch(':id/upvote')
  async upvote(@Param('id') id: string, @Body('userId') userId: number) {
    return this.reviewService.upvote(+id, userId);
  }

  @Patch(':id/downvote')
  async downvote(@Param('id') id: string, @Body('userId') userId: number) {
    return this.reviewService.downvote(+id, userId);
  }
}
