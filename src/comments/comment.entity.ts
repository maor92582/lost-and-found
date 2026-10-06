import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Report } from 'src/reports/report.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id!: string;
  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: User;
  @Column({ unique: true })
  title!: string;
  @Column({ unique: true })
  description!: string;
  @Column({ name: 'created_at' })
  createdAt!: Date;
  @ManyToOne(() => Report, (report) => report.comments)
  @JoinColumn({ name: 'report_id' })
  report: Report;
}
