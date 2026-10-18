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
import { NewCommentDTO } from './dto/request/new-comment.dto';
import { ReportsService } from 'src/reports/reports.service';
import { Report } from 'src/reports/report.entity';
import { Comment } from './comment.entity';
import { title } from 'process';
import { UpdateCommentDTO } from './dto/request/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    @Inject(forwardRef(() => ReportsService))
    private reportService: ReportsService,
  ) {}
  @UsePipes(new ValidationPipe({ transform: true, whitelist: false }))
  async createComment(
    dto: NewCommentDTO,
    creatorid: string,
    reportid: string,
  ): Promise<void> {
    dto.user = await this.userService.getUserById(creatorid);
    dto.report = await this.reportService.getRById(reportid);
    return this.commentRepository.createComment(dto);
  }
  async getCommentById(id: string): Promise<Comment> {
    return await this.commentRepository.FindComment({ id });
  }
  async checkPerms(id: string, commentid: string): Promise<Comment> {
    try {
      const comment = await this.getCommentById(commentid);
      if (comment.user && comment.user.id == id) {
        return comment;
      } else
        throw new HttpException(
          'User does not own comment',
          HttpStatus.FORBIDDEN,
        );
    } catch (error) {
      throw new HttpException('User does not own report', HttpStatus.FORBIDDEN);
    }
  }
  async deleteById(id: string, commentid: string) {
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
      if (comment != null) {
        Object.keys(dto).forEach((key) => (comment[key] = dto[key]));
        this.commentRepository.save(comment);
      }
    } catch (error) {}
  }
}
