import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private auths: AuthService) {}
  @Post('register')
  signUp(@Body() auth: createUserDto): Promise<void> {
    return this.auths.signUp(auth);
  }
  @Post('login')
  signIn(@Body() auth: createUserDto): Promise<{ accessToken: string }> {
    return this.auths.signIn(auth);
  }
}
