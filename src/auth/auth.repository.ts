import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm/browser';
import { createUserDto } from './dto/create-user.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
export class AuthRepository extends Repository<User> {
  constructor(@InjectDataSource('usersdb') datasource: DataSource) {
    super(User, datasource.createEntityManager());
  }
  async createUser(auth: createUserDto): Promise<void> {
    const { username, password, email } = auth;
    const user = this.create({ username, password, email });

    try {
      await this.insert(user);
    } catch (error) {
      if (error.code == 23505)
        throw new ConflictException('username already exists');
    }
  }
}
