import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { userProvider } from '../user/users.provider';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { JwtAuthStrategy } from './jwt-auth.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    ...userProvider,
    JwtAuthStrategy,
  ],
})
export class AuthModule { }