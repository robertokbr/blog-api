import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.create(createUserDto);

    return user as UserDto;
  }

  async findAll(query: Partial<UserDto>): Promise<UserDto[]> {
    return this.usersRepository.findAll(query);
  }

  async findOne(email: string): Promise<UserDto> {
    const user = await this.usersRepository.findByEmail(email);

    return user as UserDto;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.usersRepository.update(id, updateUserDto);

    return user as UserDto;
  }
}
