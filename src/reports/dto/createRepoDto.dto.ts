import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { ReportStatus } from '../status.enum';
import { User } from 'src/user/user.entity';
import { Transform } from 'class-transformer';

export class CreateRepoDto {
  @IsString()
  @IsNotEmpty()
  title!: string;
  @IsString()
  description!: string;
  @IsEnum(ReportStatus)
  status!: ReportStatus;
  @IsDate()
  createdAt: Date = new Date();
  @Transform((value) => new Date(value.value))
  @IsDate()
  eventDate: Date;
  user!: User;
}
