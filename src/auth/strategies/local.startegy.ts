import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authS: AuthService) {
    super({ usernameField: 'username', passwordField: 'password' });
  }
  validate(username: string, password: string) {
    const user: LoginUserDto = { username, password };
    return this.authS.signIn(user);
  }
}
