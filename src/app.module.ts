import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';


import { CategoryModule } from './category/category.module';
import { StudentModule } from './student/student.module';
// import { CustomerModule } from './customer/customer.module';
import { BookModule } from './book/book.module';
import { DatabaseModule } from './common/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { NewsModule } from './news/news.module';
import configuration from './config/configuration';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
    load: [configuration]
  }), DatabaseModule, CategoryModule, StudentModule, BookModule, NewsModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
