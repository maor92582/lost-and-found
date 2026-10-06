import {
  Exclude,
  Expose,
  TransformPlainToInstance,
  Type,
} from 'class-transformer';
import { CommentDto } from 'src/comments/dto/response/comment.dto';
import { ReportDto } from 'src/reports/dto/response/report.dto';

@Exclude()
export class UserDto {
  @Expose()
  username: string;
  @Expose()
  email: string;
  @Expose()
  @Type(() => ReportDto)
  reports: Report[];
  @Expose()
  @Type(() => CommentDto)
  comments: Comment[];
}
