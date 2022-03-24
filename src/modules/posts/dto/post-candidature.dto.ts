import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { PostCandidatureStates } from '../enums/post-candidature-states.enum';

export class PostCandidatureDto {
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsNumber()
  @ApiProperty()
  userId: number;

  @IsNumber()
  @ApiProperty()
  postId: number;

  @IsEnum(PostCandidatureStates)
  @ApiProperty({ enum: PostCandidatureStates })
  state: PostCandidatureStates;
}
