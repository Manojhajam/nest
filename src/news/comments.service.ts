import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Comments } from "./entities/comments.entity";
import { CreateCommentsDto } from "./dto/create-comments.dto";
import { News } from "./entities/news.entity";

@Injectable()
export class CommentsService {
    constructor(
        @Inject('COMMENTS_REPOSITORY')
        private commentsRepository: typeof Comments,
        @Inject('NEWS_REPOSITORY') private newsRepository: typeof News
    ) { }

    async create(createCommentsDto: CreateCommentsDto) {

        const newsId = createCommentsDto.newsId;
        try {

            const news = await this.newsRepository.findByPk(newsId);
            if (!news) {
                throw new NotFoundException('News not found');
            }
            const comments = await this.commentsRepository.create({
                ...createCommentsDto,
            } as any);

            return comments;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}