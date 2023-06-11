import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Course } from './course.entity';
import { Tag } from './tag.entity';

@Entity()
export class CourseTag {
  @PrimaryColumn()
  courseId: number;

  @PrimaryColumn()
  tagId: number;

  @ManyToOne(() => Course, (course) => course.courseTags)
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @ManyToOne(() => Tag, (tag) => tag.courseTags)
  @JoinColumn({ name: 'tagId' })
  tag: Tag;

  @Column({ default: 0 })
  upvotes: number;
}
