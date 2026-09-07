import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { AuthRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategies/local.startegy';
import passport from 'passport';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserModule,
    TypeOrmModule.forFeature([User], 'lost-and-found'),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 3600 },
    }),
  ],
  providers: [AuthService, AuthRepository, AuthGuard, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
