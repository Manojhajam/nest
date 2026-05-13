import { Comments } from "./entities/comments.entity";
import { News } from "./entities/news.entity";
import { NewsDetails } from "./entities/newsDetails.entity";

export const newsProvider = [
    { provide: 'NEWS_REPOSITORY', useValue: News },
    { provide: 'NEWS_DETAILS_REPOSITORY', useValue: NewsDetails },
    { provide: 'COMMENTS_REPOSITORY', useValue: Comments }
]