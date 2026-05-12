import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { booksProvider } from './book.provider';

@Module({
  controllers: [BookController],
  providers: [BookService, ...booksProvider],
})
export class BookModule {}

