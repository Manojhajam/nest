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

    findAll() {
        return this.commentsRepository.findAll();
    }

    findOne(id: number) {
        return this.commentsRepository.findByPk(id);
    }
    async update(id: number, updateCommentsDto: CreateCommentsDto) {
        const [affectedRows] = await this.commentsRepository.update(updateCommentsDto, {
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
        const result = this.commentsRepository.destroy({ where: { id } });
        return {
            success: true,
            message: `Comment with id ${id} deleted successfully`,
        };
    }

}