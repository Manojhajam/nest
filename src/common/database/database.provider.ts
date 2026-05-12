import { Sequelize } from "sequelize-typescript";
import { Book } from "../../book/entities/book.entity";
import { ConfigService } from "@nestjs/config";

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
    const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        logging: false,
      });

      sequelize.addModels([Book]);

      await sequelize.sync();

      return sequelize;
    },
  },
];