import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { newsProvider } from './news.provider';

@Module({
  controllers: [NewsController],
  providers: [NewsService, ...newsProvider],
})
export class NewsModule {}