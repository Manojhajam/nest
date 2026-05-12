import { IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string | undefined;

  @IsString()
  author: string | undefined;
}
