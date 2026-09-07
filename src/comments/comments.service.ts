import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { newCommentDTO } from './dto/newCommentDto.dto';
import { ReportsService } from 'src/reports/reports.service';
import { Report } from 'src/reports/report.entity';
import { Comment } from './comment.entity';
import { title } from 'process';
import { UpdateCommentDTO } from './dto/updateCommentDto.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
    @Inject(forwardRef(() => UserService)) private userS: UserService,
    @Inject(forwardRef(() => ReportsService)) private reportS: ReportsService,
  ) {}
  @UsePipes(new ValidationPipe({ transform: true, whitelist: false }))
  async createComment(
    dto: newCommentDTO,
    creatorid: string,
    reportid: string,
  ): Promise<void> {
    console.log(reportid);
    // const reports: Report[] = [];
    // const comments: Comment[] = [];
    dto.user = await this.userS.getUserById(creatorid);
    dto.report = await this.reportS.getRById(reportid);
    // dto.user.reports = reports;
    // dto.user.comments = comments;
    // console.log(dto.user);
    // dto.report.user = dto.user;
    // const comment = Object.assign(new Comment(), { title = dto.title });

    console.log(dto);
    return this.commentRepository.createComment(dto);
  }
  async getCommentById(id: string): Promise<Comment> {
    return await this.commentRepository.FindComment({ id });
  }
  async checkPerms(id: string, commentid: string): Promise<Comment> {
    try {
      console.log(commentid + ' this is my comment');
      const comment = await this.getCommentById(commentid);
      console.log(comment);
      if (comment.user && comment.user.id == id) {
        return comment;
      } else
        throw new HttpException(
          'User does not own comment',
          HttpStatus.FORBIDDEN,
        );
    } catch (error) {
      console.log(error);
      throw new HttpException('User does not own report', HttpStatus.FORBIDDEN);
    }
  }
  async deleteById(id: string, commentid: string) {
    console.log(id, commentid);
    const comment = await this.checkPerms(id, commentid);
    if (comment != null) {
      await this.commentRepository.delete(comment.id);
    } else
      throw new HttpException('User does not own report', HttpStatus.FORBIDDEN);
  }
  async updateById(
    commentId: string,
    MyId: string,
    dto: UpdateCommentDTO,
  ): Promise<void> {
    const comment = await this.checkPerms(MyId, commentId);
    try {
      console.log(dto);
      if (comment != null) {
        console.log(comment);

        Object.keys(dto).forEach((key) => (comment[key] = dto[key]));
        this.commentRepository.save(comment);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
