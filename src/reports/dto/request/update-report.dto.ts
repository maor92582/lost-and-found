import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateReportsDto {
  @IsString()
  @IsOptional()
  name: string;
  @IsOptional()
  @IsBoolean()
  isResolved: boolean;
  @IsOptional()
  @IsString()
  description: string;
}
