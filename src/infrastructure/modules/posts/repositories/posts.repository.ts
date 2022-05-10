import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../../../../domain/modules/posts/dto/create-post.dto';
import { UpdatePostDto } from '../../../../domain/modules/posts/dto/update-post.dto';
import { randomBytes } from 'crypto';
import { FindPostByQueryDto } from '../../../../domain/modules/posts/dto/find-post-by-query.dto';
import { PrismaService } from 'src/infrastructure/modules/common/prisma/prisma.service';
import { IPostRepository } from 'src/domain/modules/posts/interfaces/post.repository.interface';
import { PostDto } from 'src/domain/modules/posts/dto/post.dto';

@Injectable()
export class PostsRepository implements IPostRepository {
  constructor(private readonly client: PrismaService) {}

  public async create({ tags, ...dto }: CreatePostDto): Promise<PostDto> {
    let slug = dto.title.split(' ').join('-').toLowerCase();

    const foundBySlug = await this.client.posts.findFirst({
      where: { slug },
    });

    if (foundBySlug) {
      slug += randomBytes(3).toString('hex');
    }

    return this.client.posts.create({
      data: {
        ...dto,
        slug,
        ...(tags && {
          tags: { createMany: { data: tags.map((tag) => ({ name: tag })) } },
        }),
      },
    });
  }

  public async update(id: number, data: UpdatePostDto): Promise<PostDto> {
    const { tags, ...dto } = data;

    return this.client.posts.update({
      where: { id },
      data: {
        ...dto,
        tags: {
          deleteMany: { postId: id },
          createMany: {
            data: tags?.map((tag) => ({ name: tag })),
          },
        },
      },
    });
  }

  public async findBySlug(slug: string): Promise<PostDto> {
    return this.client.posts.findUnique({
      where: { slug },
      include: {
        user: true,
        rates: true,
        tags: true,
        comments: {
          include: {
            rates: true,
            user: true,
          },
        },
        candidatures: {
          include: {
            user: true,
          },
        },
      },
    }) as Promise<PostDto>;
  }

  public async findAll(query: FindPostByQueryDto): Promise<PostDto[]> {
    const { tag, ...dto } = query;
    return this.client.posts.findMany({
      where: {
        ...dto,
        ...(tag && {
          tags: {
            some: {
              name: tag,
            },
          },
        }),
      },
      include: {
        user: true,
        rates: true,
        comments: true,
        candidatures: true,
        tags: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    }) as Promise<PostDto[]>;
  }

  public async findByText(text: string): Promise<PostDto[]> {
    return this.client.posts.findMany({
      where: {
        OR: [
          {
            title: {
              contains: text,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: text,
              mode: 'insensitive',
            },
          },
          {
            content: {
              contains: text,
              mode: 'insensitive',
            },
          },
        ],
      },
      include: {
        user: true,
        rates: true,
        comments: true,
        candidatures: true,
        tags: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    }) as Promise<PostDto[]>;
  }

  public async delete(id: number): Promise<PostDto> {
    return this.client.posts.delete({
      where: {
        id,
      },
    });
  }
}
