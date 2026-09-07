import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class loginUserDto {
  //   @IsString()
  //   @MinLength(4)
  //   @MaxLength(28)
  username!: string;
  //   @MaxLength(28)
  //   @MinLength(4)
  //   @IsString()
  //   @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //     message: 'password is not hard',
  //   })
  password!: string;
}
