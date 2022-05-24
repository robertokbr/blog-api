import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { DtoBase } from '../../../common/base/dto.base';
import { PostCandidatureStates } from '../enums/post-candidature-states.enum';

export class PostCandidatureDto extends DtoBase {
  @IsNumber()
  @ApiProperty()
  userId: number;

  @IsNumber()
  @ApiProperty()
  postId: number;

  @IsEnum(PostCandidatureStates)
  @ApiProperty({
    enum: PostCandidatureStates,
    default: PostCandidatureStates.WAITING,
  })
  state: PostCandidatureStates = PostCandidatureStates.WAITING;
}
