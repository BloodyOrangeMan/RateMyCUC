import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ContainsChinese } from '../isCJK/vaildators';

@Entity()
export class Course {
  @PrimaryColumn()
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
