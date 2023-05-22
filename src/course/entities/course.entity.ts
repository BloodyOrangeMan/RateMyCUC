import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ContainsChinese } from '../isCJK/vaildators';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  classID: number;

  @Column()
  @ContainsChinese()
  courseName: string;

  @Column()
  @ContainsChinese()
  limitDesc: string;

  @Column()
  @ContainsChinese()
  departmentName: string;

  @Column()
  @ContainsChinese()
  courseTypeName: string;

  @Column()
  @ContainsChinese()
  teacherName: string;

  @Column()
  credit: number;

  @Column()
  hours: number;
}
