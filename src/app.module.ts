import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';



// import { CustomerModule } from './customer/customer.module';

import { DatabaseModule } from './common/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { NewsModule } from './news/news.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import configuration from './config/configuration';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
    load: [configuration]
  }), 
  DatabaseModule,NewsModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
