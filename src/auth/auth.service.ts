import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { AuthRepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';
import { loginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository) private authRepository: AuthRepository,
    private jwtService: JwtService,
    private userS: UserService,
  ) {}
  async newHash(password): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
  async signUp(auth: createUserDto): Promise<void> {
    console.log(auth);
    const hash = await this.newHash(auth.password);
    return this.authRepository.createUser(auth, hash);
  }
  async signIn(auth: loginUserDto): Promise<{ accessToken: string }> {
    console.log(auth);
    const { username, password } = auth;
    const user = await this.userS.getUserByName(username);
    const ok = await bcrypt.compare(password, user.password);
    const payload = { username: user.username, sub: user.id };
    if (!ok) throw new UnauthorizedException();
    else return { accessToken: await this.jwtService.signAsync(payload) };
  }

  async validateUser() {}
}
