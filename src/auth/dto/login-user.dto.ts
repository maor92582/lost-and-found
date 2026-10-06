import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  userName!: string;
  password!: string;
}
