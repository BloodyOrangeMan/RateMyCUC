import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Course } from '../../course/entities/course.entity';
import { Comment } from '../../comment/entities/comment.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 2, scale: 1 })
  difficulty: number;

  @Column({ type: 'decimal', precision: 2, scale: 1 })
  gain: number;
  
  @Column({ type: 'decimal', precision: 2, scale: 1 })
  score : number;
  
  @Column({ type: 'decimal', precision: 2, scale: 1 })
  rate: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  publishTime: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateTime: Date;

  @Column({ type: 'text' })
  content: string;

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

  @OneToMany(() => Comment, (comment) => comment.review)
  comment: Comment[];

  @ManyToOne(() => User, (user) => user.authoredReviews)
  author: User;

  @ManyToOne(() => Course, (course) => course.reviews)
  course: Course;

  @Column({ type: 'int', default: 0 })
  numberOfComments: number;
}
