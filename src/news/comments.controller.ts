import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CreateCommentsDto, } from "./dto/create-comments.dto";
import { get } from "https";

@Controller('comments')
export class CommentsController {

    constructor(private readonly commentsService: CommentsService) { }

    @Post()
    create(@Body() createCommentsDto: CreateCommentsDto) {
        return this.commentsService.create(createCommentsDto);
    }
    @Get()
    findAll() {
        return this.commentsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.commentsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCommentsDto: CreateCommentsDto) {
        return this.commentsService.update(+id, updateCommentsDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.commentsService.remove(+id);
    }

}