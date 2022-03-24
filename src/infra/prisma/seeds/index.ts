import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

client.posts.createMany({
  data: [
    {
      title:
        'Aplicativo de delivery para kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk',
      content:
        'Ola mundo como vão a minha ideia e lkkkkkkkkkkkk muito boa vcs vão gostar muito lllkkkkkkkkkjjjj esperem so que eu ja vou contar, deixa so eu pegar um ar, ta quase eu juro e que llllkkkkkkk e muit boa e boa demais kkkkkkkkkkkkkk, lkkkkkkkkk mas no final vcs vão gostar, mas eu acho melhor contar depois.',
      image:
        'https://images.pexels.com/photos/7376/startup-photos.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      availlablePositions: 10,
      slug: 'aplicativo-de-delivery',
      userId: 1,
    },
  ],
});
