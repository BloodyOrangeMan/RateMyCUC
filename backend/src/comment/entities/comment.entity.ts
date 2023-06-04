import { Review } from 'src/review/entities/review.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Course } from '../../course/entities/course.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  // 应该需要从user查询发过的comments比较科学吧
  // @ManyToOne(() => User, (user) => user.comments)
  // user: User;

  @ManyToOne(() => Review, (review) => review.comment)
  review: Review;

  @ManyToMany(() => User)
  @JoinTable()
  upvoteUser: User[];

  @Column({ type: 'int', default: 0 })
  upvoteCount: number;

  @ManyToMany(() => User)
  @JoinTable()
  downvoteUser: User[];

  @Column({ type: 'int', default: 0 })
  downvoteCount: number;

  @ManyToOne(() => User, (user) => user.authoredReviews)
  author: User;

  @ManyToOne(() => Course, (course) => course.comment)
  course: Course;
}
