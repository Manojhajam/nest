import { Sequelize } from "sequelize-typescript";
import { ConfigService } from "@nestjs/config";
import { News } from "../../news/entities/news.entity";
import { NewsDetails } from "../../news/entities/newsDetails.entity";
import { Comments } from "../../news/entities/comments.entity";
import { Users } from "../../user/entities/user.entity";


export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
    const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        logging: false,
        dialectOptions: {
          ssl: process.env.DB_SSL === 'true',
          native: true,
        }
      });

      sequelize.addModels([News, NewsDetails, Comments, Users]);

      await sequelize.sync();

      return sequelize;
    },
  },
];