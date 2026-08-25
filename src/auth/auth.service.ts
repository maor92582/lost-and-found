import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { AuthRepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository) private authRepository: AuthRepository,
    private jwtService: JwtService,
    private userS: UserService,
  ) {}
  async signUp(auth: createUserDto): Promise<void> {
    return this.authRepository.createUser(auth);
  }
  async signIn(auth: createUserDto): Promise<{ accessToken: string }> {
    const { username, password } = auth;
    const user = await this.userS.getUserByName(username);
    const payload = { username: user.username, sub: user.id };
    if (password != user.password) throw new NotFoundException();
    else return { accessToken: await this.jwtService.signAsync(payload) };
  }
}
