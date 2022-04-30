import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly client: PrismaService) {}

  public async create(createUserDto: CreateUserDto) {
    return this.client.users.create({
      data: createUserDto,
    });
  }

  public async update(id: number, { image, name }: UpdateUserDto) {
    return this.client.users.update({
      where: { id },
      data: { image, name },
    });
  }

  public async findByEmail(email: string) {
    return this.client.users.findUnique({
      where: { email },
    });
  }

  public async findAll(query: Partial<UserDto>) {
    return this.client.users.findMany({
      where: {
        ...query,
      },
    });
  }
}
