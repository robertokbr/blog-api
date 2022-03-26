import { PrismaClient } from '@prisma/client';
import { PostsSeed } from './posts.seed';

const client = new PrismaClient();

PostsSeed.run(client);
