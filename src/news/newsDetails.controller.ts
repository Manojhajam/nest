import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateNewsDetailsDto } from './dto/create-newsDetails.dto';
import { NewsService } from './news.service';
import { NewsDetailsService } from './newsDetails.service';


@Controller('news-details')
export class NewsDetailsController {
constructor(private readonly newsDetailsService: NewsDetailsService) {}

    @Post()
    create(@Body() CreateNewsDetailsDto: CreateNewsDetailsDto) {

     return this.newsDetailsService.create(CreateNewsDetailsDto);
    }

    @Get()
    findAll() {
        return this.newsDetailsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.newsDetailsService.findOne(id);
    }
}