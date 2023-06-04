import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Course } from '../../course/entities/course.entity';
import { ContainsChinese } from '../../validators/validator';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ContainsChinese()
  teacherName: string;

  @ManyToMany(() => Course, (course) => course.teachers)
  courses: Course[];
}
