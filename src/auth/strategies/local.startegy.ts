import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authS: AuthService) {
    super({ usernameField: 'userName', passwordField: 'password' });
  }
  validate(userName: string, password: string) {
    const user: LoginUserDto = { userName, password };
    return this.authS.signIn(user);
  }
}
