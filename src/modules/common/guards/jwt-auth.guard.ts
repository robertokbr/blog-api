import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { UserDto } from 'src/modules/users/dto/user.dto';
import fetch from 'node-fetch';
import { UsersRepository } from 'src/modules/users/repositories/users.repository';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private usersRepository: UsersRepository) {}

  private readonly logger = new Logger(JwtAuthGuard.name);
  private cache = new Map<string, { user: UserDto; createdAt: number }>();

  private getFromCache(jwt: string) {
    const data = this.cache.get(jwt);

    if (data) {
      const now = Date.now();
      const diff = now - data.createdAt;

      if (diff < 1000 * 60 * 60) {
        this.logger.debug(`returning user from cache: ${data.user}`);
        return data.user;
      }

      this.cache.delete(jwt);
    }
  }

  private setToCache(jwt: string, user: UserDto) {
    this.cache.set(jwt, { user, createdAt: Date.now() });
  }

  private async getExtraUserData(user: UserDto) {
    const extra = await this.usersRepository.findByEmail(user.email);

    if (extra) {
      return extra;
    }

    return user;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const bearerToken = context.switchToHttp().getRequest()
        .headers.authorization;

      const token = bearerToken.split(' ')[1];

      this.logger.debug(`decoding token: ${token}`);

      const cachedUser = this.getFromCache(token);

      if (cachedUser) {
        context.switchToHttp().getRequest().user = cachedUser;
        return true;
      }

      const data = await fetch(
        'https://oauth2.googleapis.com/tokeninfo?id_token=' + token,
      );

      if (data.status !== 200) {
        const message = await data.text();
        this.logger.error('Invalid token', message);

        return false;
      }

      const json = await data.json();

      const googleUser = UserDto.fromGoogleData(json);

      const user = await this.getExtraUserData(googleUser);

      context.switchToHttp().getRequest().user = user;

      this.setToCache(token, user);

      return true;
    } catch (err) {
      this.logger.error(err);
      return false;
    }
  }
}
