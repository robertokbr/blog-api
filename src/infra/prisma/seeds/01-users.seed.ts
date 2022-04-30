import { Logger } from '@nestjs/common';
import { AccountPermissions } from '../../../modules/users/enums/account-permissions.enum';
import { PrismaService } from '../../../infra/prisma/prisma.service';

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
          permission: AccountPermissions.ADMIN,
        },
      });
    } catch (error) {
      UsersSeed.logger.error(error, 'PrismaSeeds');
    }
  }
}
