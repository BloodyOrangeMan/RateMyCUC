import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review-dto';
import { User } from '../user/entities/user.entity';
import { Course } from 'src/course/entities/course.entity';
import { reviewContentLength } from '../validators/validator';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    reviewContentLength(createReviewDto.content);
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

    const responseReview = await this.reviewRepository.save(review);

    delete responseReview.author.password;

    return responseReview;
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
    reviewContentLength(updateReviewDto.content);
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
      relations: ['upvoteUser', 'downvoteUser'],
    });
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!review || !user) {
      throw new NotFoundException('Review or User not found');
    }
    if (this.checkDuplicate(review, user)) {
      throw new ConflictException('The User has already upvoted/downvoted!');
    }

    review.upvoteCount += 1;
    review.upvoteUser.push(user);

    return await this.reviewRepository.save(review);
  }

  async downvote(reviewId: number, userId: number): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: {
        id: reviewId,
      },
      relations: ['upvoteUser', 'downvoteUser'],
    });
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!review || !user) {
      throw new NotFoundException('Review or User not found');
    }
    if (this.checkDuplicate(review, user)) {
      throw new ConflictException('The User has already upvoted/downvoted!');
    }
    review.downvoteCount += 1;
    review.downvoteUser.push(user);

    return this.reviewRepository.save(review);
  }

  checkDuplicate(review: Review, user: User): boolean {
    return (
      review.upvoteUser.some((userFromReview) => {
        return userFromReview.id == user.id;
      }) ||
      review.downvoteUser.some((userFromReview) => {
        return userFromReview.id == user.id;
      })
    );
  }
}
