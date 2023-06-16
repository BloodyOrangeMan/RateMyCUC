import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Course } from '../course/entities/course.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Review } from 'src/review/entities/review.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { TypeORMSession } from 'src/auth/entities/session.entity';
import { Tag } from 'src/course/entities/tag.entity';
import { CourseTag } from 'src/course/entities/course-tag.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        User,
        Course,
        Teacher,
        Review,
        Comment,
        Tag,
        CourseTag,
        TypeORMSession,
      ],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
})
export class DatabaseModule {}
