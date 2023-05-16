import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/modules/common/decorators/get-user.decorator';
import { RequireRole } from 'src/modules/common/decorators/require-role.decorator';
import { JwtAuthGuard } from 'src/modules/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/common/guards/roles.guard';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';
import { Role } from '../enums/role.enum';
import { UsersService } from '../services/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: UserDto })
  create(@GetUser() user: UserDto): Promise<UserDto> {
    return this.usersService.findOrCreate({
      email: user.email,
      name: user.name,
      image: user.image,
    });
  }

  @Get()
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @RequireRole(Role.ADMIN)
  @ApiBearerAuth()
  @ApiResponse({ type: UserDto })
  findAll(@Query() userDto: Partial<UserDto>): Promise<UserDto[]> {
    return this.usersService.findAll(userDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: UserDto })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: UserDto,
  ): Promise<UserDto> {
    return this.usersService.update(+id, updateUserDto, user);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @RequireRole(Role.ADMIN)
  @ApiBearerAuth()
  @ApiResponse({ type: UserDto })
  delete(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.delete(+id);
  }
}
