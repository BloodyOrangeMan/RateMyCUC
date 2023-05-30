import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { ContainsChinese } from '../isCJK/vaildators';
import { Review } from '../../review/entities/review.entity';

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

  @OneToMany(() => Review, (review) => review.course)
  reviews: Review[];

  @Column({ type: 'int', default: 0 })
  totalDifficulty: number;

  @Column({ type: 'int', default: 0 })
  totalGain: number;

  @Column({ type: 'int', default: 0 })
  totalRate: number;

  @Column({ type: 'int', default: 0 })
  numberOfRatings: number;
}
