import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { NewCommentDTO } from './dto/request/new-comment.dto';
import { CommentsService } from './comments.service';
import { UpdateCommentDTO } from './dto/request/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}
  @Patch(':id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: false }))
  updateComment(@Param('id') id: string, @Request() req): Promise<void> {
    const dto: UpdateCommentDTO = req.body;
    return this.commentService.updateById(id, req.user.sub, dto);
  }
  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(204)
  deleteComment(@Param('id') reportid: string, @Request() req) {
    return this.commentService.deleteById(req.user.sub, reportid);
  }
}
