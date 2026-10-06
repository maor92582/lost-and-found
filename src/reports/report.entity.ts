import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
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
  @Column({ name: 'created_at' })
  createdAt!: Date;
  @Column({ name: 'event_date' })
  eventDate!: Date;
  @ManyToOne(() => User, (user) => user.reports)
  @JoinColumn({ name: 'user_id' })
  user!: User;
  @IsOptional()
  @OneToMany(() => Comment, (comment) => comment.report)
  @IsOptional()
  comments!: Comment[];
  @Column({ name: 'is_resolved' })
  isResolved!: boolean;
}
