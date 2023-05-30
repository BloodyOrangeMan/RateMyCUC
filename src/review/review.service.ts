import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review-dto';
import { User } from '../user/entities/user.entity';
import { Course } from 'src/course/entities/course.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(User)
    private courseRepository: Repository<Course>,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const author = await this.userRepository.findOneBy({
      id: createReviewDto.authorId,
    });
    const course = await this.courseRepository.findOneBy({
      classID: createReviewDto.courseId,
    });

    if (!author || !course) {
      throw new NotFoundException('User or Course not found');
    }

    const review = this.reviewRepository.create({
      ...createReviewDto,
      author,
      course,
    });

    course.totalDifficulty += createReviewDto.difficulty;
    course.totalGain += createReviewDto.gain;
    course.totalRate += createReviewDto.rate;
    course.numberOfRatings += 1;

    await this.courseRepository.save(course);

    return this.reviewRepository.save(review);
  }

  async findAll(): Promise<Review[]> {
    return this.reviewRepository.find();
  }

  async findById(id: number): Promise<Review> {
    const review = await this.reviewRepository.findOneBy({ id });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return review;
  }

  async update(id: number, updateReviewDto: CreateReviewDto): Promise<Review> {
    const result = await this.reviewRepository.update(id, updateReviewDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return this.reviewRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    const result = await this.reviewRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
  }

  async upvote(reviewId: number, userId: number): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: {
        id: reviewId,
      },
      relations: ['upvoteUser', 'upvoteCount'],
    });
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!review || !user) {
      throw new NotFoundException('Review or User not found');
    }

    review.upvoteUser.push(user);

    review.upvoteCount += 1;

    return this.reviewRepository.save(review);
  }

  async downvote(reviewId: number, userId: number): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: {
        id: reviewId,
      },
      relations: ['downvoteUser', 'downvoteCount'],
    });
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!review || !user) {
      throw new NotFoundException('Review or User not found');
    }

    review.downvoteUser.push(user);

    review.downvoteCount += 1;

    return this.reviewRepository.save(review);
  }
}
