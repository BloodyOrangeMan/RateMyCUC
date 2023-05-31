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

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  // 应该需要从user查询发过的comments比较科学吧
  // @ManyToOne(() => User, (user) => user.comments)
  // user: User;

  @ManyToOne(() => Review, (review) => review.id)
  review: Review;

  @ManyToMany(() => User)
  @JoinTable()
  likes: User[];

  @ManyToMany(() => User)
  @JoinTable()
  dislikes: User[];
}
