import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  username!: string;
  password!: string;
}
