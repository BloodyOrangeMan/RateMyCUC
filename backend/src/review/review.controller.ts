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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review-dto';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiOperation({ summary: 'Create review' })
  @ApiResponse({
    status: 201,
    description: 'The review has been successfully created.',
  })
  @ApiBody({ type: CreateReviewDto })
  async create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  // @Get()
  // @ApiOperation({ summary: 'Get reviews' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The reviews have been successfully retrieved.',
  // })
  // async findAll() {
  //   return this.reviewService.findAll();
  // }

  @Get(':id')
  @ApiOperation({ summary: 'Get review by id' })
  @ApiResponse({
    status: 200,
    description: 'The review has been successfully retrieved.',
  })
  @ApiParam({ name: 'id', required: true })
  async findById(@Param('id') id: string) {
    return this.reviewService.findById(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update review' })
  @ApiResponse({
    status: 200,
    description: 'The review has been successfully updated.',
  })
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: CreateReviewDto })
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: CreateReviewDto,
  ) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete review' })
  @ApiResponse({
    status: 200,
    description: 'The review has been successfully deleted.',
  })
  @ApiParam({ name: 'id', required: true })
  async delete(@Param('id') id: string) {
    return this.reviewService.delete(+id);
  }

  @Patch(':id/upvote')
  @ApiOperation({ summary: 'Upvote review' })
  @ApiResponse({
    status: 200,
    description: 'The review has been successfully upvoted.',
  })
  @ApiParam({ name: 'id', required: true })
  async upvote(@Param('id') id: string, @Body('userId') userId: number) {
    return this.reviewService.upvote(+id, userId);
  }

  @Patch(':id/downvote')
  @ApiOperation({ summary: 'Downvote review' })
  @ApiResponse({
    status: 200,
    description: 'The review has been successfully downvoted.',
  })
  @ApiParam({ name: 'id', required: true })
  async downvote(@Param('id') id: string, @Body('userId') userId: number) {
    return this.reviewService.downvote(+id, userId);
  }
}
