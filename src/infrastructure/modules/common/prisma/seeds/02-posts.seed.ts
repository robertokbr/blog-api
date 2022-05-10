import { Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

export class PostsSeed {
  private static readonly logger = new Logger(PostsSeed.name);

  static async run(client: PrismaService) {
    this.logger.log('Running posts seed... 🌱');

    try {
      await client.posts.create({
        data: {
          title: 'Jogo de carangueijos',
          content:
            'Ola mundo como vão a minha ideia e lkkkkkkkkkkkk muito boa vcs vão gostar muito lllkkkkkkkkkjjjj esperem so que eu ja vou contar, deixa so eu pegar um ar, ta quase eu juro e que llllkkkkkkk e muit boa e boa demais kkkkkkkkkkkkkk, lkkkkkkkkk mas no final vcs vão gostar, mas eu acho melhor contar depois.',
          slug: 'jogo-de-carangueijos',
          userId: 1,
          tags: {
            createMany: {
              data: [
                {
                  name: 'Blog',
                },
              ],
            },
          },
          description:
            'Ola mundo como vão a minha ideia e lkkkkkkkkkkkk muito boa vcs vão gostar muito lllkkkkkkkkkjjjj esperem so que eu ja vou contar.',
          comments: {
            createMany: {
              data: [
                {
                  userId: 1,
                  content: 'Massa demais',
                },
                {
                  userId: 1,
                  content:
                    'Interrupting.\nI get interrupted constantly. Even if I am the presenter or otherwise the current speaker. Other women get interrupted. But men very rarely do.\n\n\nI tried doing the "what was she going to say?" when men interrupt other women, but the other women get so embarrassed that they wave it off. Double making me look like a bitch.',
                },
                {
                  userId: 1,
                  content:
                    'I literally say outloud ‘I wasn’t finished talking’ or if it’s someone I think will back down, I continue talking. I just don’t stop. We can both talk at the same time and nobody can hear either of our ideas, or you can wait for me to be done Brian.',
                },
              ],
            },
          },
        },
      });

      await client.posts.create({
        data: {
          title: 'Jogo de pintos',
          content:
            '## O primeiro e unico jogo de pinto\nOla mundo como vão a minha ideia e lkkkkkkkkkkkk muito boa vcs vão gostar muito lllkkkkkkkkkjjjj esperem so que eu ja vou contar, deixa so eu pegar um ar, ta quase eu juro e que llllkkkkkkk e muit boa e boa demais kkkkkkkkkkkkkk, lkkkkkkkkk mas no final vcs vão gostar, mas eu acho melhor contar depois.',
          slug: 'jogo-de-pintos',
          userId: 1,
          tags: {
            createMany: {
              data: [
                {
                  name: 'Blog',
                },
                {
                  name: 'Node',
                },
                {
                  name: 'Self-Marketing',
                },
                {
                  name: 'Empregabilidade',
                },
              ],
            },
          },
          description:
            'Ola mundo como vão a minha ideia e lkkkkkkkkkkkk muito boa vcs vão gostar muito lllkkkkkkkkkjjjj esperem so que eu ja vou contar.',
          comments: {
            createMany: {
              data: [
                {
                  userId: 1,
                  content: 'Massa demais',
                },
                {
                  userId: 1,
                  content:
                    'Interrupting.\nI get interrupted constantly. Even if I am the presenter or otherwise the current speaker. Other women get interrupted. But men very rarely do.\n\n\nI tried doing the "what was she going to say?" when men interrupt other women, but the other women get so embarrassed that they wave it off. Double making me look like a bitch.',
                },
                {
                  userId: 1,
                  content:
                    'I literally say outloud ‘I wasn’t finished talking’ or if it’s someone I think will back down, I continue talking. I just don’t stop. We can both talk at the same time and nobody can hear either of our ideas, or you can wait for me to be done Brian.',
                },
              ],
            },
          },
        },
      });
    } catch (error) {
      Logger.error(error, 'PrismaSeeds');
    }
  }
}
