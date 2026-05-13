import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { NewsDetails } from "./entities/newsDetails.entity";
import { CreateNewsDetailsDto } from "./dto/create-newsDetails.dto";
import { News } from "./entities/news.entity";



@Injectable()
export class NewsDetailsService {
    constructor(@Inject('NEWS_DETAILS_REPOSITORY') private newsDetailsRepository: typeof NewsDetails,
        @Inject('NEWS_REPOSITORY') private newsRepository: typeof News) { }


    async create(createNewsDetailsDto: CreateNewsDetailsDto) {

        const newsId = createNewsDetailsDto.newsId;
        if (!newsId) {
            throw new Error('News ID is required');
        }

        const news = await this.newsRepository.findByPk(newsId);
        if (!news) {
            throw new NotFoundException('News not found');
        }

        const newsDetails = news.toJSON() as News;

        const slug = newsDetails.slug;
        console.log('News Slug:', slug);

        return this.newsDetailsRepository.create({
            ...createNewsDetailsDto,
            slug: slug,
        } as any);
    }

    findAll() {
        return this.newsDetailsRepository.findAll();
    }

    findOne(id: string) {
        return this.newsDetailsRepository.findOne({ where: { id } });
    }
}