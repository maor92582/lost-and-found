import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { updateUserDto } from './dto/update-user.dto';
import { DeepPartial } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @Inject(forwardRef(() => AuthService)) private authS: AuthService,
  ) {}
  async getUserById(id: string): Promise<User> {
    return this.userRepository.FindUser({ id });
  }
  async getUserByName(username: string): Promise<User> {
    return await this.userRepository.FindUser({ username });
  }

  async updateUser(id: string, dto: updateUserDto): Promise<void> {
    // const user = this.getUserByName(username);
    console.log(dto.Password);
    const user = await this.getUserById(id);
    const deepP: DeepPartial<User> = {
      username: dto.Username || user.username,
      email: dto.newEmail || user.email,
      password: (await this.authS.newHash(dto.Password)) || user.password,
    };
    console.log(deepP, dto.Password);
    this.userRepository.update({ id: id }, deepP);
  }
}
