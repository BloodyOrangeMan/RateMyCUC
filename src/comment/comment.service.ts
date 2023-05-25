import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async createComment(content: string, userId: number): Promise<Comment> {
    const comment = this.commentRepository.create({
      content,
    });
    return this.commentRepository.save(comment);
  }

  async getCommentById(commentId: number): Promise<Comment | undefined> {
    return this.commentRepository.findOne(commentId);
  }

  async updateComment(
    commentId: number,
    updatedContent: string,
  ): Promise<Comment | undefined> {
    const comment = await this.commentRepository.findOne(commentId);
    if (comment) {
      comment.content = updatedContent;
      return this.commentRepository.save(comment);
    }
    return undefined;
  }

  async deleteComment(commentId: number): Promise<boolean> {
    const result = await this.commentRepository.delete(commentId);
    return result.affected > 0;
  }
}

function id(id: any): Comment | PromiseLike<Comment> {
  throw new Error('Function not implemented.');
}
