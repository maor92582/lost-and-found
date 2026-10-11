import {
  Body,
  Controller,
  Get,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
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
  async getUser(@Request() req) {
    // const dto = new GetUserDto();
    // dto.id = String(req.user.sub);
    // const errors = await validate(dto);

    // // 3. בודקים אם יש שגיאות (למשל, אם המשתמש לא קיים במסד הנתונים)
    // console.log(errors);
    return this.userService.getUserById(req.user.sub).then((result) => result);
  }
  @UseGuards(AuthGuard)
  @Patch('/me')
  updateUser(@Request() req, @Body() dto: UpdateUserDto): Promise<void> {
    return this.userService.updateUser(req.user.sub, dto);
  }
}
