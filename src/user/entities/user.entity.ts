import { Review } from 'src/review/entities/review.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Review, (review) => review.author)
  authoredReviews: Review[];

  @ManyToMany(() => Review, (review) => review.upvoteUser)
  upvotedReviews: Review[];

  @ManyToMany(() => Review, (review) => review.downvoteUser)
  downvotedReviews: Review[];
}
