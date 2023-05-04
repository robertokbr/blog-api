import { Logger } from '@nestjs/common';
import { Role } from '../../../users/enums/role.enum';
import { PrismaService } from '../prisma.service';

export class UsersSeed {
  private static readonly logger = new Logger(UsersSeed.name);

  static async run(client: PrismaService) {
    this.logger.log('Running posts seed... 🌱');

    try {
      await client.users.create({
        data: {
          email: 'robertojuniordev@gmail.com',
          name: 'Roberto Junior',
          github: 'robertokbr',
          role: Role.ADMIN,
        },
      });
    } catch (error) {
      UsersSeed.logger.error(error, 'PrismaSeeds');
    }
  }
}
