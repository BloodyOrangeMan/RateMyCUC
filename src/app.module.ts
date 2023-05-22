import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, AuthModule, DatabaseModule, CourseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
