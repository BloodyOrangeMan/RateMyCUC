import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CourseTag } from './course-tag.entity';
import { User } from 'src/user/entities/user.entity';

@Entity('user_upvote')
export class UserUpvoteTag {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => CourseTag)
  courseTag: CourseTag;
}
