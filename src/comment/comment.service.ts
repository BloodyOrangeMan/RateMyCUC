import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment-dto';
import { commentContentLength } from '../validators/validator';
import { User } from 'src/user/entities/user.entity';
import { Review } from 'src/review/entities/review.entity';
import { Course } from 'src/course/entities/course.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    commentContentLength(createCommentDto.content);
    const author = await this.userRepository.findOneBy({
      id: createCommentDto.authorId,
    });
    const course = await this.courseRepository.findOneBy({
      classID: createCommentDto.courseId,
    });
    const review = await this.reviewRepository.findOneBy({
      id: createCommentDto.reviewId,
    });

    if (!author || !course || !review) {
      throw new NotFoundException('User or Course or Review not found');
    }

    const comment = this.commentRepository.create({
      ...createCommentDto,
      author,
      course,
      review,
    });

    review.numberOfComments += 1;

    await this.reviewRepository.save(review);

    const responseComment = await this.commentRepository.save(comment);

    delete responseComment.author.password;

    return responseComment;
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find();
  }

  async findById(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOneBy({ id });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  async update(
    id: number,
    updateCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    commentContentLength(updateCommentDto.content);
    const result = await this.reviewRepository.update(id, updateCommentDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return this.commentRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    const result = await this.commentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }

  async findByReviewId(reviewId: number): Promise<Comment[]> {
    return this.commentRepository.find({ where: { review: { id: reviewId } } });
  }

  // async createForReview(
  //   reviewId: number,
  //   createCommentDto: CreateCommentDto,
  // ): Promise<Comment> {
  //   const comment = this.commentRepository.create({
  //     ...createCommentDto,
  //     review: { id: reviewId },
  //   });
  //   return this.commentRepository.save(comment);
  // }

  async upvote(commentId: number, userId: number): Promise<Comment> {
    const comment = await this.commentRepository.findOneBy({
      id: commentId,
    });
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!comment || !user) {
      throw new NotFoundException('Comment or User not found');
    }

    comment.upvoteCount += 1;

    return this.commentRepository.save(comment);
  }

  async downvote(commentId: number, userId: number): Promise<Comment> {
    const comment = await this.commentRepository.findOneBy({
      id: commentId,
    });
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!comment || !user) {
      throw new NotFoundException('Comment or User not found');
    }

    comment.downvoteCount += 1;

    return this.commentRepository.save(comment);
  }
}
