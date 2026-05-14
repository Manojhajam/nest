import {
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";

import { News } from "../../news/entities/news.entity";

@Table({
  tableName: "news_details",
  paranoid: true,
})
export class NewsDetails extends Model<NewsDetails> {

  @ForeignKey(() => News)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true, // IMPORTANT for one-to-one
  })
  newsId!: number;

  @BelongsTo(() => News)
  news!: News;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  slug!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  content!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  meta_title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  meta_description!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  tags!: string;
}