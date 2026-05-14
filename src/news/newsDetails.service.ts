import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { NewsDetails } from "./entities/newsDetails.entity";
import { CreateNewsDetailsDto } from "./dto/create-newsDetails.dto";
import { News } from "./entities/news.entity";



@Injectable()
export class NewsDetailsService {
    constructor(@Inject('NEWS_DETAILS_REPOSITORY') private newsDetailsRepository: typeof NewsDetails,
        @Inject('NEWS_REPOSITORY') private newsRepository: typeof News) { }


    async create(newsId: number, createNewsDetailsDto: CreateNewsDetailsDto) {

        if (!newsId) {
            throw new Error('News ID is required');
        }

        const news = await this.newsRepository.findByPk(newsId);

        if (!news) {
            throw new NotFoundException('News not found');
        }

        const existing = await this.newsDetailsRepository.findOne({
            where: { newsId },
        });

        if (existing) {
            throw new BadRequestException('News details already exist for this news');
        }
        const newsd = news.toJSON() as News;

        const slug = newsd.slug;
        console.log('Generated slug:', newsd.slug);

        return this.newsDetailsRepository.create({
            ...createNewsDetailsDto,
            newsId,
            slug,
        } as any);
    }

    findAll() {
        return this.newsDetailsRepository.findAll();
    }

    findOne(newsId: string) {
        return this.newsDetailsRepository.findOne({ where: { newsId } });
    }

    remove(newsId: number) {
        return this.newsDetailsRepository.destroy({ where: { newsId } });
    }


}