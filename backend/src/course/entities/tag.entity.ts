import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CourseTag } from './course-tag.entity';
import { Length } from 'class-validator';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 12 })
  name: string;

  @OneToMany(() => CourseTag, (courseTag) => courseTag.tag)
  courseTags: CourseTag[];

  @Column({ default: 0 })
  totalUpvotes: number;
}
