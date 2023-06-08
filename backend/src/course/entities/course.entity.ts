import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
// import { ContainsChinese } from '../../validators/validator';
import { ApiProperty } from '@nestjs/swagger';
import { Review } from '../../review/entities/review.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Teacher } from '../../teacher/entities/teacher.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the course.',
  })
  classID: number;

  @Column()
  @ApiProperty({ example: '030079', description: 'The course number.' })
  courseNumber: string;

  @Column()
  @ApiProperty({ example: '软件工程', description: 'The course name.' })
  courseName: string;

  @Column()
  @ApiProperty({
    example: '限选课程',
    description: 'The course limit description.',
  })
  limitDesc: string;

  @Column()
  @ApiProperty({ example: '计算机学院', description: 'The department name.' })
  departmentName: string;

  @Column()
  @ApiProperty({ example: '学科基础课', description: 'The course type name.' })
  courseTypeName: string;

  @Column()
  @ApiProperty({ example: '张也', description: 'The teacher name.' })
  teacherName: string;

  @Column('decimal', { precision: 3, scale: 1 })
  @ApiProperty({ example: 2.5, description: 'The credit hours of the course.' })
  credit: number;

  @Column()
  @ApiProperty({ example: 48, description: 'The total hours of the course.' })
  hours: number;

  @OneToMany(() => Review, (review) => review.course)
  reviews: Review[];

  @OneToMany(() => Comment, (comment) => comment.course)
  comment: Comment[];

  @ManyToMany(() => Teacher, (teacher) => teacher.courses, {
    cascade: ['insert'],
  })
  @JoinTable()
  teachers: Teacher[];

  @Column({ type: 'int', default: 0 })
  totalDifficulty: number;

  @Column({ type: 'int', default: 0 })
  totalGain: number;

  @Column( 'decimal', { precision: 3, scale: 1,default: 0  })
  totalRate: number;

  @Column({ type: 'int', default: 0 })
  numberOfRatings: number;
}
