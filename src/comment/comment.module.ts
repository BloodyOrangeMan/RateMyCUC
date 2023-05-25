import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CommentService } from './comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]), // 导入 Comment 实体类
  ],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
