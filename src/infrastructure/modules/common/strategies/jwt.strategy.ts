import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';

export type AuthenticatorDecodedToken = {
  appId?: string;
  sub?: string;
  name: string;
  email: string;
  phone?: string;
};

@Injectable()
export class AuthenticatorJwtStrategy extends PassportStrategy(
  Strategy,
  'authenticatorJwt',
) {
  private logger = new Logger(AuthenticatorJwtStrategy.name);

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'morenas2',
    });
  }

  async validate(payload: AuthenticatorDecodedToken) {
    this.logger.log(payload);

    return payload;
  }
}
