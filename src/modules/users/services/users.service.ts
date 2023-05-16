import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  private findOne(email: string): Promise<UserDto> {
    return this.usersRepository.findByEmail(email);
  }

  async findOrCreate(createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.findOne(createUserDto.email);

    if (user) return user;

    return this.usersRepository.create(createUserDto);
  }

  async findAll(query: Partial<UserDto>): Promise<UserDto[]> {
    return this.usersRepository.findAll(query) as Promise<UserDto[]>;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    user: UserDto,
  ): Promise<UserDto> {
    if (id !== user.id) {
      throw new ForbiddenException("You're only able to update your own user");
    }

    return this.usersRepository.update(id, updateUserDto);
  }

  async delete(id: number): Promise<UserDto> {
    return this.usersRepository.delete(id);
  }
}
