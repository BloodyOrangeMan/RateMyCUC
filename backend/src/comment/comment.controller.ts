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
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment-dto';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOperation({ summary: 'Create comment' })
  @ApiResponse({
    status: 201,
    description: 'The comment has been successfully created.',
  })
  @ApiBody({ type: CreateCommentDto })
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all comments' })
  @ApiResponse({
    status: 200,
    description: 'The comments have been successfully retrieved.',
  })
  async findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get comment by id' })
  @ApiResponse({
    status: 200,
    description: 'The comment has been successfully retrieved.',
  })
  @ApiParam({ name: 'id', required: true })
  async findById(@Param('id') id: string) {
    return this.commentService.findById(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update comment' })
  @ApiResponse({
    status: 200,
    description: 'The comment has been successfully updated.',
  })
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: CreateCommentDto })
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: CreateCommentDto,
  ) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete comment' })
  @ApiResponse({
    status: 200,
    description: 'The comment has been successfully deleted.',
  })
  @ApiParam({ name: 'id', required: true })
  async delete(@Param('id') id: string) {
    return this.commentService.delete(+id);
  }

  @Patch(':id/upvote')
  @ApiOperation({ summary: 'Upvote comment' })
  @ApiResponse({
    status: 200,
    description: 'The comment has been successfully upvoted.',
  })
  @ApiParam({ name: 'id', required: true })
  async upvote(@Param('id') id: string, @Body('userId') userId: number) {
    return this.commentService.upvote(+id, userId);
  }

  @Patch(':id/downvote')
  @ApiOperation({ summary: 'Downvote comment' })
  @ApiResponse({
    status: 200,
    description: 'The comment has been successfully upvoted.',
  })
  @ApiParam({ name: 'id', required: true })
  async downvote(@Param('id') id: string, @Body('userId') userId: number) {
    return this.commentService.downvote(+id, userId);
  }
}
