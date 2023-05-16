import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { PostCandidatureState } from '../enums/post-candidature-state.enum';
import { DtoBase } from 'src/modules/common/dtos/dto.base';

export class PostCandidatureDto extends DtoBase {
  @IsNumber()
  @ApiProperty()
  userId: number;

  @IsNumber()
  @ApiProperty()
  postId: number;

  @IsEnum(PostCandidatureState)
  @ApiProperty({
    enum: PostCandidatureState,
    default: PostCandidatureState.WAITING,
  })
  state: PostCandidatureState = PostCandidatureState.WAITING;
}
