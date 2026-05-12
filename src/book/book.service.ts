import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @Inject('BOOK_REPOSITORY') private bookRepository: typeof Book,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    return this.bookRepository.create(createBookDto as any);
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.findAll();
  }

  async findOne(id: number): Promise<Book | null> {
    return this.bookRepository.findByPk(id);
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<[number]> {
    return this.bookRepository.update(updateBookDto as any, { where: { id } });
  }

  async remove(id: number): Promise<number> {
    return this.bookRepository.destroy({ where: { id } });
  }
}
