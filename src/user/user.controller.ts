import {
  Body,
  Controller,
  Get,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserGuard } from './user.guard';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UserDto } from './dto/response/user.dto';
import { TransformPlainToInstance } from 'class-transformer';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('/me')
  @TransformPlainToInstance(UserDto)
  getUser(@Request() req): Promise<Record<string, any>> {
    return this.userService.getUserById(req.user.sub).then((result) => result);
  }
  @UseGuards(AuthGuard)
  @Patch('/me')
  updateUser(@Request() req, @Body() dto: UpdateUserDto): Promise<void> {
    return this.userService.updateUser(req.user.sub, dto);
  }
}
