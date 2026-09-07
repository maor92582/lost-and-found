import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { ReportsModule } from 'src/reports/reports.module';
import { UserModule } from 'src/user/user.module';
import { CommentRepository } from './comment.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment], 'lost-and-found'),
    forwardRef(() => ReportsModule),
    forwardRef(() => UserModule),
  ],
  controllers: [CommentsController],
  providers: [CommentRepository, CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
