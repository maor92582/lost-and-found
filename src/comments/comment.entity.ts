import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { classToPlain, Exclude } from 'class-transformer';
import { Report } from 'src/reports/report.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id!: string;
  @ManyToOne(() => User, (user) => user.comments)
  user: User;
  @Column({ unique: true })
  title!: string;
  @Column({ unique: true })
  description!: string;
  @Column()
  createdAt!: Date;
  @ManyToOne(() => Report, (report) => report.comments)
  report: Report;
  toJSON() {
    return classToPlain(this);
  }
}
