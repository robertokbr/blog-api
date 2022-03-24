import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class UserDto {
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  image: string;

  @IsString()
  @ApiProperty()
  email: string;

  @IsDate()
  @ApiProperty()
  createdAt: Date;

  @IsDate()
  @ApiProperty()
  updatedAt: Date;
}
