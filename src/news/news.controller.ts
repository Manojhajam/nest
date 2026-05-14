import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { CreateCommentsDto } from './dto/create-comments.dto';
import { CommentsService } from './comments.service';
import { NewsDetailsService } from './newsDetails.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService, private readonly commentsService: CommentsService, private readonly newsDetailService: NewsDetailsService) { }

  @Post()
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @Post(':newsId/newsDetails')
  createNewsDetail(@Param('newsId') newsId: string, @Body() createNewsDetailsDto: any) {
    return this.newsDetailService.create({ ...createNewsDetailsDto, newsId: +newsId });
  }

  @Post(':newsId/comments')
  createComment(@Param('newsId') newsId: string, @Body() createCommentsDto: CreateCommentsDto) {
    return this.newsService.createComment({ ...createCommentsDto, newsId: +newsId });
  }

  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(+id, updateNewsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}
