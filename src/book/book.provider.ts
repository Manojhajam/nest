import { Book } from "./entities/book.entity";

export const booksProvider = [
    { provide: 'BOOK_REPOSITORY', useValue: Book },
]