import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';
import { CreateCommentsDto } from './dto/create-comments.dto';
import { Comments } from './entities/comments.entity';
import { NewsDetails } from './entities/newsDetails.entity';


@Injectable()
export class NewsService {
  constructor(@Inject('NEWS_REPOSITORY') private newsRepository: typeof News,
  @Inject('COMMENTS_REPOSITORY') private commentsRepository: typeof Comments, @Inject('NEWS_DETAILS_REPOSITORY') private newsDetailsRepository: typeof NewsDetails) { }


  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '') // remove special characters
      .replace(/\s+/g, '-')         // spaces → hyphen
      .replace(/-+/g, '-');          // collapse multiple hyphens
  }

  async create(createNewsDto: CreateNewsDto) {
    const title = createNewsDto.title?.trim();
    if (!title) {
      throw new BadRequestException('title is required');
    }

    const slug = this.generateSlug(`${title}+${Date.now()}`);

    const news = await this.newsRepository.create({
      ...createNewsDto,
      title,
      slug,
    } as any);

    return news;
  }

  findAll() {
    return this.newsRepository.findAll();
  }

  findOne(id: number) {
    return this.newsRepository.findByPk(id, {
      include: [NewsDetails],
    });
  }


  async update(id: number, updateNewsDto: UpdateNewsDto) {
    const [affectedRows] = await this.newsRepository.update(updateNewsDto, {
      where: { id },
    });

    if (affectedRows === 0) {
      throw new NotFoundException(`News with id ${id} not found`);
    }

    return {
      success: true,
      message: 'News updated successfully',
    };
  }

  remove(id: number) {
    return this.newsRepository.destroy({ where: { id } });
  }

  async createComment(createCommentsDto: CreateCommentsDto) {
    const newsId = createCommentsDto.newsId;
    if (!newsId) {
      throw new BadRequestException('News ID is required');
    }

    const news = await this.newsRepository.findByPk(newsId);
    if (!news) {
      throw new BadRequestException('News not found');
    }

    const comment = await this.commentsRepository.create({
      ...createCommentsDto,
      newsId: +newsId,
    } as any);

    return comment;
  }

}

