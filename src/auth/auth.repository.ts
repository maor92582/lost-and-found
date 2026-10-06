import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
export class AuthRepository extends Repository<User> {
  constructor(@InjectDataSource() datasource: DataSource) {
    super(User, datasource.createEntityManager());
  }
  async createUser(auth: CreateUserDto, hash: string): Promise<void> {
    const { userName, email } = auth;
    const user = this.create({ userName, password: hash, email });

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
