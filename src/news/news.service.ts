import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';
import { Not } from 'sequelize-typescript';

@Injectable()
export class NewsService {
  constructor(@Inject('NEWS_REPOSITORY') private newsRepository: typeof News) { }


  create(createNewsDto: CreateNewsDto) {
    return this.newsRepository.create(createNewsDto as any);
  }

  findAll() {
    return this.newsRepository.findAll();
  }

  findOne(id: number) {
    return this.newsRepository.findByPk(id);
  }

  async update(id: number, updateNewsDto: UpdateNewsDto) {
    const [affectedRows] = await this.newsRepository.update(updateNewsDto, {
      where: { id },
    });


    if (!affectedRows) {
      return new NotFoundException(`News with id ${id} not found or no changes detected`);
    }
    if (affectedRows === 0) {
      return {
        success: false,
        message: 'News not found or nothing updated',
      };
    }

    return {
      success: true,
      message: 'News updated successfully',
    };
  }

  remove(id: number) {
    return this.newsRepository.destroy({ where: { id } });
  }
}
