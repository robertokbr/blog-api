import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/common/prisma/prisma.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { FindPostByQueryDto } from '../dto/find-post-by-query.dto';
import { PostDto } from '../dto/post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class PostsRepository {
  constructor(private readonly client: PrismaService) {}

  public async findById(id: number): Promise<PostDto> {
    return this.client.posts.findUnique({
      where: { id },
    });
  }

  public async create({ tags, ...dto }: CreatePostDto): Promise<PostDto> {
    return this.client.posts.create({
      data: {
        ...dto,
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
          ...(data?.tags &&
            data.tags.length > 0 && {
              createMany: {
                data: tags?.map((tag) => ({ name: tag })),
              },
            }),
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
          orderBy: {
            rates: {
              _count: 'desc',
            },
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
            },
          },
          {
            description: {
              contains: text,
            },
          },
          {
            content: {
              contains: text,
            },
          },
        ],
      },
      include: {
        user: true,
        rates: true,
        comments: true,
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
