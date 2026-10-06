import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthRepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository) private authRepository: AuthRepository,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  async newHash(password): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
  async signUp(auth: CreateUserDto): Promise<void> {
    const hash = await this.newHash(auth.password);
    return this.authRepository.createUser(auth, hash);
  }
  async signIn(auth: LoginUserDto): Promise<{ accessToken: string }> {
    const { userName, password } = auth;
    const user = await this.userService.getUserByName(userName);
    const ok = await bcrypt.compare(password, user.password);
    const payload = { username: user.userName, sub: user.id };
    if (!ok) throw new UnauthorizedException();
    else return { accessToken: await this.jwtService.signAsync(payload) };
  }

  async validateUser() {}
}
