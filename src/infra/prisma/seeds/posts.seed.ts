import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export class PostsSeed {
  static async run(client: PrismaClient) {
    Logger.log('Running posts seed... 🌱', 'PrismaSeeds');

    try {
      await client.posts.create({
        data: {
          title:
            'Aplicativo de delivery para kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk',
          content:
            'Ola mundo como vão a minha ideia e lkkkkkkkkkkkk muito boa vcs vão gostar muito lllkkkkkkkkkjjjj esperem so que eu ja vou contar, deixa so eu pegar um ar, ta quase eu juro e que llllkkkkkkk e muit boa e boa demais kkkkkkkkkkkkkk, lkkkkkkkkk mas no final vcs vão gostar, mas eu acho melhor contar depois.',
          image:
            'https://images.pexels.com/photos/7376/startup-photos.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          availlablePositions: 10,
          slug: 'aplicativo-de-delivery',
          userId: 1,
          participation: 10,
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
          title: 'Baralho magico',
          content:
            'Ola mundo como vão a minha ideia e lkkkkkkkkkkkk muito boa vcs vão gostar muito lllkkkkkkkkkjjjj esperem so que eu ja vou contar, deixa so eu pegar um ar, ta quase eu juro e que llllkkkkkkk e muit boa e boa demais kkkkkkkkkkkkkk, lkkkkkkkkk mas no final vcs vão gostar, mas eu acho melhor contar depois.',
          link: 'https://github.com/robertokbr',
          availlablePositions: 5,
          slug: 'baralho-magico',
          userId: 1,
          participation: 2,
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
          title: 'Futebol de arroz',
          content:
            'Ola mundo como vão a minha ideia e lkkkkkkkkkkkk muito boa vcs vão gostar muito lllkkkkkkkkkjjjj esperem so que eu ja vou contar, deixa so eu pegar um ar, ta quase eu juro e que llllkkkkkkk e muit boa e boa demais kkkkkkkkkkkkkk, lkkkkkkkkk mas no final vcs vão gostar, mas eu acho melhor contar depois.',
          link: 'https://github.com/hen-tr',
          slug: 'futebol-de-arroz',
          userId: 1,
          availlablePositions: 5,
          participation: 2,
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
