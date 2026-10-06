import { Exclude } from 'class-transformer';

export class CommentDto {
  @Exclude()
  id: string;
}
