import { IsNumber, IsString } from 'class-validator';

export class CreateNewsDetailsDto {

    @IsString()
    content: string | undefined;

    @IsString()
    meta_title: string | undefined;

    @IsString()
    meta_description: string | undefined;

    @IsString()
    tags: string | undefined;

}