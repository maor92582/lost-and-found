import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class createUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(28)
  username!: string;
  @IsNotEmpty()
  @MaxLength(28)
  @MinLength(4)
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is not hard',
  })
  password!: string;
  @IsEmail()
  @MaxLength(28)
  @MinLength(4)
  email!: string;
}
