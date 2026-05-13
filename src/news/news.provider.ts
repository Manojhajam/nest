import { News } from "./entities/news.entity";

export const newsProvider = [
    { provide: 'NEWS_REPOSITORY', useValue: News },
]