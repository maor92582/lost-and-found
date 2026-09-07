import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { classToPlain, Exclude } from 'class-transformer';
import { ReportStatus } from './status.enum';
import { User } from 'src/user/user.entity';
import { Comment } from 'src/comments/comment.entity';
import { IsOptional } from 'class-validator';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id!: string;
  @Column()
  title!: string;
  @Column()
  description!: string;
  @Column()
  status!: ReportStatus;
  @Column()
  createdAt!: Date;
  @Column()
  eventDate!: Date;
  @ManyToOne(() => User, (user) => user.reports)
  user!: User;
  @IsOptional()
  @OneToMany(() => Comment, (comment) => comment.report)
  @IsOptional()
  comments!: Comment[];
  @Column()
  isResolved!: boolean;
  toJSON() {
    return classToPlain(this);
  }
}
