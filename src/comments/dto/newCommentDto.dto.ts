import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Report } from 'src/reports/report.entity';
import { User } from 'src/user/user.entity';

export class newCommentDTO {
  @IsNotEmpty()
  @IsString()
  title!: string;
  @IsNotEmpty()
  @IsString()
  description!: string;
  @IsNotEmpty()
  @IsDate()
  createdAt: Date = new Date();
  user!: User;
  report!: Report;
}
