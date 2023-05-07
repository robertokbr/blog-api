import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from './prisma/prisma.service';
import { AuthenticatorJwtStrategy } from './strategies/jwt.strategy';
import { jwtConfig } from 'src/configs/jwt.config';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [PrismaService, AuthenticatorJwtStrategy],
  exports: [PrismaService, JwtModule],
})
export class CommonModule {}
