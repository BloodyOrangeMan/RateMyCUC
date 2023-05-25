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

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Review, review => review.comments)
  review: Review;

  @ManyToMany(() => User)
  @JoinTable()
  likes: User[];

  @ManyToMany(() => User)
  @JoinTable()
  dislikes: User[];
}
