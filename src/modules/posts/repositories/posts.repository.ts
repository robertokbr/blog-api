import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { randomBytes } from 'crypto';
import { FindPostByQueryDto } from '../dto/find-post-by-query.dto';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class PostsRepository {
  constructor(private readonly client: PrismaService) {}

  public async create({ tags, ...dto }: CreatePostDto) {
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

  public async update(id: number, data: UpdatePostDto) {
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

  public async findBySlug(slug: string) {
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
    });
  }

  public async findAll(query: FindPostByQueryDto) {
    const { tag, ...dto } = query;
    return this.client.posts.findMany({
      where: {
        ...dto,
        ...(tag && {
          tags: {
            some: {
              name: {
                contains: tag,
                mode: 'insensitive',
              },
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
    });
  }

  public async findByText(text: string) {
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
    });
  }

  public async delete(id: number) {
    return this.client.posts.delete({
      where: {
        id,
      },
    });
  }
}
