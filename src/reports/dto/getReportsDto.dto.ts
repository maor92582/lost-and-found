import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ReportStatus } from '../status.enum';
import { User } from 'src/user/user.entity';
import { SortBy, SortOrder } from '../sort.enum';
import { Transform } from 'class-transformer';

export class GetReportsDto {
  //   @Transform(({ value }) => {
  //     if (value == 'LOST') return ReportStatus.LOST;
  //     else if (value == 'FOUND') return ReportStatus.FOUND;
  //     else if (!value) return 'f';
  //   })
  @IsEnum(ReportStatus)
  @IsOptional()
  status: ReportStatus;
  @IsOptional()
  @IsBoolean()
  isResolved?: boolean;
  @IsString()
  search: string = '';
  @IsEnum(SortBy)
  sortBy: SortBy = SortBy.createdAt;
  @IsEnum(SortOrder)
  sortOrder: SortOrder = SortOrder.ASC;
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  limit: number = 20;
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  page: number = 1;
}
