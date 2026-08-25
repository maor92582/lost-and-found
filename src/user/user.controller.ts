import { Controller, Get, Patch, Request, UseGuards } from '@nestjs/common';
import { UserGuard } from './user.guard';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private userS: UserService) {}

  @UseGuards(UserGuard)
  @Get('/me')
  getUser(@Request() req): Promise<User> {
    return this.userS.getUserByName(req.user.username);
  }
  @UseGuards(UserGuard)
  @Patch('/me')
  updateUser(@Request() req): Promise<User> {
    return this.userS.getUserByName(req.user.username);
  }
}
