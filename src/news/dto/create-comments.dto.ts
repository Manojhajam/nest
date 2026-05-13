import { IsString, IsNumber } from "class-validator";


export class CreateCommentsDto {

    @IsNumber()
    newsId: number | undefined;

    @IsString()
    content: string | undefined;

    @IsString()
    username: string | undefined;
}