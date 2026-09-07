import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { NotFoundException, Search } from '@nestjs/common';

export class UserRepository extends Repository<User> {
  constructor(@InjectDataSource('lost-and-found') datasource: DataSource) {
    super(User, datasource.createEntityManager());
  }

  async FindUser(search: {}): Promise<User> {
    try {
      const user = await this.findOne({
        where: search,
        relations: { reports: true, comments: true },
      });
      if (user) {
        return user;
      } else throw new NotFoundException();
    } catch (eror) {
      console.log(eror);
      throw new NotFoundException();
    }
  }
}
