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
import { updateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private userS: UserService) {}

  @UseGuards(AuthGuard)
  @Get('/me')
  getUser(@Request() req): Promise<Record<string, any>> {
    return this.userS
      .getUserById(req.user.sub)
      .then((result) => result.toJSON());
  }
  @UseGuards(AuthGuard)
  @Patch('/me')
  updateUser(@Request() req, @Body() dto: updateUserDto): Promise<void> {
    console.log(req.user.sub);
    console.log(dto);
    return this.userS.updateUser(req.user.sub, dto);
  }
}
