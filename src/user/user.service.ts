import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}
  async getUserById(id: string): Promise<User> {
    return this.userRepository.FindUser({ id });
  }
  async getUserByName(username: string): Promise<User> {
    return this.userRepository.FindUser({ username });
  }
}
