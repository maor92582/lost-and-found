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
import { newCommentDTO } from './dto/newCommentDto.dto';
import { CommentsService } from './comments.service';
import { UpdateCommentDTO } from './dto/updateCommentDto.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentS: CommentsService) {}

  //   @Post('create')
  //   @UseGuards(AuthGuard)
  //   newComment(@Request() req, @Body() dto: newCommentDTO): Promise<void> {
  //     dto.createdAt = new Date();
  //     console.log(dto.description, dto.title);
  //     return this.commentS.createComment(dto, req.user.sub, req.body['reportid']);
  //   }
  @Patch(':id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: false }))
  updateComment(@Param('id') id: string, @Request() req): Promise<void> {
    const dto: UpdateCommentDTO = req.body;
    return this.commentS.updateById(id, req.user.sub, dto);
  }
  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(204)
  deleteComment(@Param('id') reportid: string, @Request() req) {
    return this.commentS.deleteById(req.user.sub, reportid);

    // return 'deleted';
  }
}
