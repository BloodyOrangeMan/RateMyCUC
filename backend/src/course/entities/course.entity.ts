import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  AfterLoad,
} from 'typeorm';
// import { ContainsChinese } from '../../validators/validator';
import { ApiProperty } from '@nestjs/swagger';
import { Review } from '../../review/entities/review.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Teacher } from '../../teacher/entities/teacher.entity';
import { CourseTag } from './course-tag.entity';
import { Tag } from './tag.entity';

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

  @Column({
    type: 'decimal',
    precision: 100,
    scale: 1,
    default: 0,
    transformer: {
      from: (value) => parseFloat(value),
      to: (value) => value,
    },
  })
  totalDifficulty: number;

  @Column({
    type: 'decimal',
    precision: 100,
    scale: 1,
    default: 0,
    transformer: {
      from: (value) => parseFloat(value),
      to: (value) => value,
    },
  })
  totalGain: number;

  @Column({
    type: 'decimal',
    precision: 100,
    scale: 1,
    default: 0,
    transformer: {
      from: (value) => parseFloat(value),
      to: (value) => value,
    },
  })
  totalRate: number;

  @Column({
    type: 'decimal',
    precision: 100,
    scale: 1,
    default: 0,
    transformer: {
      from: (value) => parseFloat(value),
      to: (value) => value,
    },
  })
  totalScore: number;

  @Column({ type: 'int', default: 0 })
  numberOfRatings: number;

  @OneToMany(() => CourseTag, (courseTag) => courseTag.course)
  courseTags: CourseTag[];

  tags: Tag[];

  @AfterLoad()
  _convertTags() {
    this.tags = this.courseTags
      ? this.courseTags.map((courseTag) => courseTag.tag)
      : [];
  }
}
