import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { textToSlugUtil } from 'src/shared/utils/text-to-slug.util';
import { CreatePostDto } from '../dto/create-post.dto';
import { FindPostByQueryDto } from '../dto/find-post-by-query.dto';
import { PostTagDto } from '../dto/post-tag.dto';
import { PostDto } from '../dto/post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostAccessRepository } from '../repositories/post-access.repository';
import { PostTagsRepository } from '../repositories/post-tags.repository';
import { PostsRepository } from '../repositories/posts.repository';
import { S3BucketProvider } from '../providers/bucket.provider';
import { StabilityAIImageGeneratorProvider } from '../providers/image-generator.provider';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly postTagsRepository: PostTagsRepository,
    private readonly postAccessRepository: PostAccessRepository,
    private readonly imageGeneratorProvider: StabilityAIImageGeneratorProvider,
    private readonly bucketProvider: S3BucketProvider,
  ) {}

  private async generateImage(
    post: Partial<Omit<CreatePostDto, 'tags'>>,
    slug: string,
  ) {
    const content = post.content;

    const prompts = content.match(/(?<=\{\{)(.*?)(?=\}\})/g);

    if (prompts?.length > 0) {
      const urls: string[] = [];

      const promises = prompts.map(async (prompt) => {
        const promptRegExp = new RegExp(`{{${prompt}}}`, 'g');

        try {
          const imagePath = await this.imageGeneratorProvider.generate(
            prompt,
            `${slug}-${Date.now()}`,
          );

          const url = await this.bucketProvider.uploadFile(imagePath);

          post.content = post.content.replace(
            promptRegExp,
            `![${prompt}](${url})`,
          );

          urls.push(url);
        } catch (err) {
          this.logger.error(err);
          post.content = post.content.replace(promptRegExp, '');
        }
      });

      await Promise.all(promises);

      if (urls?.length > 0) {
        post.image = urls[0];
      }
    }
  }

  public async create(createPostDto: CreatePostDto): Promise<PostDto> {
    const slug = textToSlugUtil(createPostDto.title);

    await this.generateImage(createPostDto, slug);

    return this.postsRepository.create({ ...createPostDto, slug });
  }

  private async findByTextSearch(text: string) {
    return this.postsRepository.findByText(text);
  }

  public async findAll(
    findPostByQueryDto: FindPostByQueryDto,
  ): Promise<PostDto[]> {
    const { input } = findPostByQueryDto;

    if (input) {
      return this.findByTextSearch(input) as Promise<PostDto[]>;
    }

    return this.postsRepository.findAll(findPostByQueryDto);
  }

  public async findOne(slug: string, userId: number): Promise<PostDto> {
    const post = await this.postsRepository.findBySlug(slug);

    await this.postAccessRepository.create({
      postSlug: slug,
      userId,
    });

    return post;
  }

  public async update(
    id: number,
    updatePostDto: UpdatePostDto,
  ): Promise<PostDto> {
    const post = await this.postsRepository.findById(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }
    await this.generateImage(updatePostDto, post.slug);

    console.log(updatePostDto);

    return this.postsRepository.update(id, updatePostDto);
  }

  public async delete(id: number): Promise<PostDto> {
    return this.postsRepository.delete(id);
  }

  public async findAllPostTags(): Promise<PostTagDto[]> {
    const tags = await this.postTagsRepository.findAll();
    const names = tags.map((tag) => tag.name);
    const filteredNames = new Set(names);

    const filteredTags = [...filteredNames].map((tag) => {
      const ft = new PostTagDto();
      Object.assign(ft, { name: tag });
      return ft;
    });

    return [...filteredTags];
  }
}
