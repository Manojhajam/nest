import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProvider } from './users.provider';



@Module({
  controllers: [UserController],
  providers: [UserService, ...userProvider],
})
export class UserModule {}
