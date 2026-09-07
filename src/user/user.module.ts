import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User], 'lost-and-found'),
    forwardRef(() => AuthModule),
  ],
  providers: [UserRepository, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
