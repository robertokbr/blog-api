import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }

  findAll(query: Partial<UserDto>) {
    return this.usersRepository.findAll(query);
  }

  findOne(email: string) {
    return this.usersRepository.findByEmail(email);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }
}
