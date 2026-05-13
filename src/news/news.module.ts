import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { newsProvider } from './news.provider';
import { NewsDetailsController } from './newsDetails.controller';
import { NewsDetailsService } from './newsDetails.service';

@Module({
  controllers: [NewsController, NewsDetailsController],
  providers: [NewsService, NewsDetailsService, ...newsProvider],
})
export class NewsModule {}