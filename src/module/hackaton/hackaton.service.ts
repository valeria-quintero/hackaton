import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateHackatonDto } from './dto/create-hackaton.dto';
import { UpdateHackatonDto } from './dto/update-hackaton.dto';
import { PrismaService } from '../../lib/database/prisma.service';

@Injectable()
export class HackatonService {
  constructor(private readonly prisma: PrismaService) {}

  // El modelo guarda fechas como texto (TimestamptzString), no como Date
  private toIso(value: Date | string): string {
    return new Date(value).toISOString();
  }

  async create(dto: CreateHackatonDto, authorId: string) {
    return this.prisma.orm.public.Hackaton.create({
      name: dto.name,
      description: dto.description,
      startDate: this.toIso(dto.startsAt),
      endDate: this.toIso(dto.endsAt),
      isActive: dto.isActive ?? true,
      authorId,
    });
  }

  async findAll() {
    return this.prisma.orm.public.Hackaton
      .select('id', 'name', 'description', 'startDate', 'endDate', 'isActive', 'authorId', 'createdAt', 'updatedAt')
      .all();
  }

  async findOne(id: number) {
    const hackaton = await this.prisma.orm.public.Hackaton.where({ id }).first();
    if (!hackaton) throw new NotFoundException('Hackaton not found');
    return hackaton;
  }

  async update(id: number, dto: UpdateHackatonDto) {
    await this.findOne(id);
    const { startsAt, endsAt, ...rest } = dto;
    return this.prisma.orm.public.Hackaton.where({ id }).update({
      ...rest,
      ...(startsAt && { startDate: this.toIso(startsAt) }),
      ...(endsAt && { endDate: this.toIso(endsAt) }),
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.orm.public.Hackaton.where({ id }).delete();
    return null;
  }

  async join(hackatonId: number, userId: string) {
    const hackaton = await this.findOne(hackatonId);

    const endTime = new Date(hackaton.endDate).getTime();
    if (Number.isNaN(endTime)) {
      throw new InternalServerErrorException('Could not read the hackaton end date');
    }
    if (!hackaton.isActive || endTime < Date.now()) {
      throw new BadRequestException(
        'This hackaton is not accepting registrations at this time',
      );
    }

    const alreadyJoined = await this.prisma.orm.public.HackatonParticipant
      .where({ hackatonId, userId })
      .first();
    if (alreadyJoined) {
      throw new BadRequestException('Already joined this hackaton');
    }

    return this.prisma.orm.public.HackatonParticipant.create({ hackatonId, userId });
  }

  async getParticipants(hackatonId: number) {
    await this.findOne(hackatonId);
    return this.prisma.orm.public.HackatonParticipant
      .where({ hackatonId })
      .select('id', 'userId', 'createdAt')
      .all();
  }
}