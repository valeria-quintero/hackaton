import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';

@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles('ADMIN')
  @ResponseMessage('Fetch all users')
  findAll() {
    return this.userService.findAllUsers();
  }

  @Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
  return this.userService.findUserById(id);
}
}