import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { randomBytes } from 'crypto';
import { FindPostByQueryDto } from '../dto/find-post-by-query.dto';

@Injectable()
export class PostsRepository {
  constructor(private readonly client: PrismaClient) {}

  public async create(createPostDto: CreatePostDto) {
    let slug = createPostDto.title.split(' ').join('-').toLowerCase();

    const foundBySlug = await this.client.posts.findFirst({
      where: {
        slug,
      },
    });

    if (foundBySlug) {
      slug += randomBytes(3).toString('hex');
    }

    return this.client.posts.create({
      data: { ...createPostDto, slug },
    });
  }

  public async update(id: number, data: UpdatePostDto) {
    return this.client.posts.update({
      where: { id },
      data,
    });
  }

  public async findBySlug(slug: string) {
    return this.client.posts.findUnique({
      where: { slug },
      include: {
        user: true,
        rates: true,
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
    return this.client.posts.findMany({
      where: {
        ...query,
      },
      include: {
        user: true,
        rates: true,
        comments: true,
        candidatures: true,
      },
    });
  }
}
