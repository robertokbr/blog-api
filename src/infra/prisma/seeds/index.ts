import { PrismaService } from '../../../infra/prisma/prisma.service';
import { UsersSeed } from './01-users.seed';
import { PostsSeed } from './02-posts.seed';

const client = new PrismaService();
const seeds = [UsersSeed, PostsSeed];

(async () => {
  await Promise.all(seeds.map((seed) => seed.run(client)));
})();
