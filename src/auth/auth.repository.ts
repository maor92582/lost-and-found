import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { createUserDto } from './dto/create-user.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
export class AuthRepository extends Repository<User> {
  constructor(@InjectDataSource('lost-and-found') datasource: DataSource) {
    super(User, datasource.createEntityManager());
  }
  async createUser(auth: createUserDto, hash: string): Promise<void> {
    const { username, email } = auth;
    const user = this.create({ username, password: hash, email });

    try {
      await this.insert(user);
    } catch (error) {
      if (error.constraint == 'UQ_78a916df40e02a9deb1c4b75edb')
        throw new ConflictException('username already exists');
      else if (error.constraint == 'UQ_e12875dfb3b1d92d7d7c5377e22')
        throw new ConflictException('Email already exists');
      else throw new ConflictException(error);
    }
  }
}
