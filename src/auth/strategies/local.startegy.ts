import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { loginUserDto } from '../dto/login-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authS: AuthService) {
    super({ usernameField: 'username', passwordField: 'password' });
  }
  validate(username: string, password: string) {
    const user: loginUserDto = { username, password };
    return this.authS.signIn(user);
  }
}
