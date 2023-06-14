import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CourseModule } from './course/course.module';
import { ReviewModule } from './review/review.module';
import { CommentModule } from './comment/comment.module';
import { TeacherModule } from './teacher/teacher.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SanitizeMiddleware } from './middlewares/sanitize.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../frontend/dist'),
    }),
    UsersModule,
    AuthModule,
    DatabaseModule,
    CourseModule,
    ReviewModule,
    CommentModule,
    TeacherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SanitizeMiddleware).forRoutes('*');
  }
}
