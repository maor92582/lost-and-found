import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/user/user.entity';

export class UpdateCommentDTO {
  @IsNotEmpty()
  @IsString()
  title!: string;
  @IsNotEmpty()
  @IsString()
  description!: string;
  user!: User;
  report!: Report;
}
