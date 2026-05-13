import { IsString } from 'class-validator';
import { Is } from 'sequelize-typescript';

export class CreateNewsDto {
  @IsString()
  title: string | undefined;

  @IsString()
  slug: string | undefined;

  @IsString()
  image: string | undefined;

  @IsString()
  description: string | undefined;
}
