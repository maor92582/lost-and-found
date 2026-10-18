import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transform } from 'class-transformer';
import { Report } from 'src/reports/report.entity';
import { Comment } from 'src/comments/comment.entity';
import { IsArray, IsOptional } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ unique: true, name: 'user_name' })
  userName!: string;

  @Column({ unique: true })
  email!: string;

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
}
