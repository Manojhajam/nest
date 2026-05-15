import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards, Req } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { CreateCommentsDto } from './dto/create-comments.dto';
import { NewsDetailsService } from './newsDetails.service';

import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import type { UserRequest } from '../common/types';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService, private readonly newsDetailService: NewsDetailsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()

  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/news',

        filename: (req, file, callback) => {
          const uniqueName =
            Date.now() + extname(file.originalname);

          callback(null, uniqueName);
        },
      }),
    }),
  )
  create(
    @UploadedFile() file: any,
    @Body() createNewsDto: CreateNewsDto,
    @Req() req: UserRequest,
  ) {
    return this.newsService.create(createNewsDto, file);
  }

  @Get()
  findAll(@Req() req: UserRequest) {
    console.log(req.user);
    return this.newsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/news',
        filename: (req, file, callback) => {
          const uniqueName = Date.now() + extname(file.originalname);
          callback(null, uniqueName);
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @UploadedFile() file: any,
    @Body() updateNewsDto: UpdateNewsDto,
  ) {
    return this.newsService.update(+id, updateNewsDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':newsId/newsDetails')
  createNewsDetail(@Param('newsId') newsId: string, @Body() createNewsDetailsDto: any) {
    return this.newsDetailService.create(+newsId, { ...createNewsDetailsDto, newsId: +newsId });
  }

  @Get('newsDetails')
  findAllNewsDetails() {
    return this.newsDetailService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':newsId/newsDetails')
  findNewsDetail(@Param('newsId') newsId: string) {
    return this.newsDetailService.findOne(+newsId);
  }


  @UseGuards(JwtAuthGuard)
  @Delete(':id/newsDetails')
  removeNewsDetail(@Param('id') id: string) {
    return this.newsDetailService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':newsId/comments')
  createComment(@Param('newsId') newsId: string, @Body() createCommentsDto: CreateCommentsDto) {
    return this.newsService.createComment(+newsId, createCommentsDto);
  }


  @Get(':newsId/comments')
  findAllCommentsById(@Param('newsId') newsId: string) {
    return this.newsService.findAllCommentsById(+newsId);
  }


}
