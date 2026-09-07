import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { classToPlain, Exclude, Transform } from 'class-transformer';
import { Report } from 'src/reports/report.entity';
import { Comment } from 'src/comments/comment.entity';
import { IsArray, IsOptional } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: string;
  @Column({ unique: true })
  username!: string;
  @Column({ unique: true })
  email!: string;
  @Exclude({ toPlainOnly: true })
  @Column()
  password!: string;
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => value ?? [])
  @OneToMany(() => Report, (report) => report.user, { nullable: true })
  reports: Report[];
  @IsArray()
  @IsOptional()
  @Transform(({ value }) => value ?? [])
  @OneToMany(() => Comment, (comment) => comment.user, { nullable: true })
  comments: Comment[];
  toJSON() {
    return classToPlain(this);
  }
}
