import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  userName!: string;
  @IsOptional()
  password!: string;
  @IsOptional()
  newEmail!: string;
}
