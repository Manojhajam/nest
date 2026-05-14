import { IsString, IsNumber, IsOptional, IS_OPTIONAL } from "class-validator";


export class CreateCommentsDto {

    @IsNumber()
    @IsOptional()
    newsId: number | undefined;

    @IsString()
    content: string | undefined;

    @IsString()
    username: string | undefined;
}