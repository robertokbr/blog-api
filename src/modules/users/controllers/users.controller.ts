import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() userDto: Partial<UserDto>): Promise<UserDto> {
    return this.usersService.findAll(userDto);
  }

  @Get(':email')
  findOne(@Param('email') email: string): Promise<UserDto> {
    return this.usersService.findOne(email);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.usersService.update(+id, updateUserDto);
  }
}
