// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Comment } from './entities/comment.entity';
// import { CreateCommentDto } from './dto/create-comment-dto';

// @Injectable()
// export class CommentService {
//   constructor(
//     @InjectRepository(Comment)
//     private commentRepository: Repository<Comment>,
//   ) {}

//   async create(createCommentDto: CreateCommentDto): Promise<Comment> {
//     const comment = this.commentRepository.create(createCommentDto);
//     return this.commentRepository.save(comment);
//   }

//   async findAll(): Promise<Comment[]> {
//     return this.commentRepository.find();
//   }

//   async findById(id: number): Promise<Comment> {
//     return this.commentRepository.findOne(id);
//   }

//   async update(
//     id: number,
//     updateCommentDto: CreateCommentDto,
//   ): Promise<Comment> {
//     const comment = await this.commentRepository.preload({
//       id: +id,
//       ...updateCommentDto,
//     });
//     if (!comment) {
//       throw new Error('Comment not found');
//     }
//     return this.commentRepository.save(comment);
//   }

//   async delete(id: number): Promise<void> {
//     const comment = await this.commentRepository.findOne(id);
//     if (!comment) {
//       throw new Error('Comment not found');
//     }
//     this.commentRepository.remove(comment);
//   }

//   async findByReviewId(reviewId: number): Promise<Comment[]> {
//     return this.commentRepository.find({ where: { reviewId } });
//   }

//   async createForReview(
//     reviewId: number,
//     createCommentDto: CreateCommentDto,
//   ): Promise<Comment> {
//     const comment = this.commentRepository.create({
//       ...createCommentDto,
//       reviewId,
//     });
//     return this.commentRepository.save(comment);
//   }
// }

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment-dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = this.commentRepository.create(createCommentDto);
    return this.commentRepository.save(comment);
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find();
  }

  async findById(id: number): Promise<Comment> {
    return this.commentRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const comment = await this.commentRepository.preload({ id, ...updateCommentDto });
    if (!comment) {
      throw new Error('Comment not found');
    }
    return this.commentRepository.save(comment);
  }

  async delete(id: number): Promise<void> {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if (!comment) {
      throw new Error('Comment not found');
    }
    await this.commentRepository.remove(comment);
  }

  async findByReviewId(reviewId: number): Promise<Comment[]> {
    return this.commentRepository.find({ where: { review: { id: reviewId } } });
  }

  async createForReview(
    reviewId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const comment = this.commentRepository.create({ ...createCommentDto, review: { id: reviewId } });
    return this.commentRepository.save(comment);
  }
}
