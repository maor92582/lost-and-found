import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { loginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private auths: AuthService) {}
  @Post('register')
  @UsePipes(new ValidationPipe())
  signUp(@Body() auth: createUserDto): Promise<void> {
    return this.auths.signUp(auth);
  }
  //   @UseGuards(AuthGuard('local'))
  //   @Post('login')
  //   signIn(@Body() auth: loginUserDto): Promise<{ accessToken: string }> {
  //     console.log(typeof auth);
  //     return this.auths.signIn(auth);
  //   }
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(200)
  async login(@Request() req) {
    return req.user;
  }
}
