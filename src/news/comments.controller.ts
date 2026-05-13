import { Body, Controller, Post } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CreateCommentsDto, } from "./dto/create-comments.dto";

@Controller('comments')
export class CommentsController {

    constructor(private readonly commentsService: CommentsService) { }

    @Post()
    create(@Body() createCommentsDto: CreateCommentsDto) {
        return this.commentsService.create(createCommentsDto);
    }

}