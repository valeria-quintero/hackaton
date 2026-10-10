import {
  Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post,
} from '@nestjs/common';
import {
  Session,
} from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { auth } from '../../lib/auth/auth';
import { HackatonService } from './hackaton.service';
import { CreateHackatonDto } from './dto/create-hackaton.dto';
import { UpdateHackatonDto } from './dto/update-hackaton.dto';

@Controller('hackaton')
export class HackatonController {
  constructor(private readonly hackatonService: HackatonService) {}

  @Post()
  create(
    @Body() dto: CreateHackatonDto,
    @Session() session: UserSession<typeof auth>,
  ) {
    return this.hackatonService.create(dto, session.user.id);
  }

  @Get()
  findAll() {
    return this.hackatonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.hackatonService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateHackatonDto) {
    return this.hackatonService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.hackatonService.remove(id);
  }

  @Post(':id/join')
  join(
    @Param('id', ParseIntPipe) id: number,
    @Session() session: UserSession<typeof auth>,
  ) {
    return this.hackatonService.join(id, session.user.id);
  }

  @Get(':id/participants')
  participants(@Param('id', ParseIntPipe) id: number) {
    return this.hackatonService.getParticipants(id);
  }
}