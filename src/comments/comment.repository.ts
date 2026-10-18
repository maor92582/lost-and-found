import { DataSource, Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { NewCommentDTO } from './dto/request/new-comment.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

export class CommentRepository extends Repository<Comment> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }
  async createComment(dto: NewCommentDTO): Promise<void> {
    const comment = this.create(dto);
    try {
      await this.insert(comment);
    } catch (error) {
      if (error.code == 23505) throw new ConflictException(error);
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
      throw new NotFoundException();
    }
  }
}
