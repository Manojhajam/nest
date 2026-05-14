import { IsString, IsOptional } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  title: string | undefined;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
