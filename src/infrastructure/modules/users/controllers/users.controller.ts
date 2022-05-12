import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../../../../domain/modules/users/dto/create-user.dto';
import { UpdateUserDto } from '../../../../domain/modules/users/dto/update-user.dto';
import { UserDto } from '../../../../domain/modules/users/dto/user.dto';
import { UsersService } from '../services/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    type: UserDto,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.usersService.create(createUserDto);
  }

  @ApiResponse({
    type: UserDto,
  })
  @Get()
  findAll(@Query() userDto: Partial<UserDto>): Promise<UserDto[]> {
    return this.usersService.findAll(userDto);
  }

  @ApiResponse({
    type: UserDto,
  })
  @Get(':email')
  findOne(@Param('email') email: string): Promise<UserDto> {
    return this.usersService.findOne(email);
  }

  @ApiResponse({
    type: UserDto,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiResponse({
    type: UserDto,
  })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.delete(+id);
  }
}