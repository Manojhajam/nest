// import { Module } from '@nestjs/common';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { userProvider } from '../user/users.provider';


// @Module({
//   controllers: [AuthController],
//   providers: [AuthService, ...userProvider],
// })
// export class AuthModule {}


import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { userProvider } from '../user/users.provider';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';

@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET || 'default_secret',
    signOptions: { expiresIn: '1h' },
  })],
  controllers: [AuthController],
  providers: [AuthService, ...userProvider],
})
export class AuthModule { }