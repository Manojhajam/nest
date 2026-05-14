import { IsString, IsNumber, IsOptional, IS_OPTIONAL } from "class-validator";


export class CreateCommentsDto {

    @IsString()
    content: string | undefined;
    
    @IsOptional()
    @IsString()
    username: string | undefined;
}