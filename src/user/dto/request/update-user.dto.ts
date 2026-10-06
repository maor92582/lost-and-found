import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  Username!: string;
  @IsOptional()
  Password!: string;
  @IsOptional()
  newEmail!: string;
}
