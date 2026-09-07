import { IsNotEmpty, IsOptional } from 'class-validator';

export class updateUserDto {
  @IsOptional()
  Username!: string;
  //   @IsNotEmpty()
  //   currentpassword!: string;
  @IsOptional()
  Password!: string;
  @IsOptional()
  newEmail!: string;
}
