import { DataSource, Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { newCommentDTO } from './dto/newCommentDto.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

export class CommentRepository extends Repository<Comment> {
  constructor(@InjectDataSource('lost-and-found') datasource: DataSource) {
    super(Comment, datasource.createEntityManager());
  }
  async createComment(dto: newCommentDTO): Promise<void> {
    console.log('dto: ' + dto);
    const comment = this.create(dto);
    console.log('createcomment: ' + comment);
    try {
      await this.insert(comment);
    } catch (error) {
      if (error.code == 23505) throw new ConflictException(error);
      console.log(error);
    }
  }
  async FindComment(search: {}): Promise<Comment> {
    try {
      const comment = await this.findOne({
        where: search,
        relations: { user: true, report: true },
      });
      if (comment) {
        return comment;
      } else throw new NotFoundException();
    } catch (eror) {
      console.log(eror);
      throw new NotFoundException();
    }
  }
}
