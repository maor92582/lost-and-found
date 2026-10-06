import { Exclude, Expose, Type } from 'class-transformer';
import { Comment } from 'src/comments/comment.entity';
import { CommentDto } from 'src/comments/dto/response/comment.dto';
import { ReportStatus } from 'src/reports/status.enum';
import { UserDto } from 'src/user/dto/response/user.dto';
import { User } from 'src/user/user.entity';

export class ReportDto {
  @Exclude()
  id: string;
  @Type(() => CommentDto)
  comments: Comment[];
  @Type(() => UserDto)
  user: User;
}
