import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../lib/database/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private selectAllUsers() {
    return this.prisma.orm.public.User
      .select('id', 'email', 'username', 'name', 'createdAt', 'updatedAt')
      .all();
  }

  async findAllUsers() {
    const users = await this.selectAllUsers();
    // Más recientes primero
    return users.sort((a, b) =>
      String(b.createdAt).localeCompare(String(a.createdAt)),
    );
  }

  async findUserById(id: number) {
    const users = await this.selectAllUsers();
    const user = users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}