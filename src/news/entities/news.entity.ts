import {
  Column,
  DataType,
  Table,
  Model,
  HasOne,
} from "sequelize-typescript";
import { NewsDetails } from "./newsDetails.entity";


@Table({
  tableName: "news",
  paranoid: true,
})
export class News extends Model<News> {

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  slug!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description!: string;

  @HasOne(() => NewsDetails)
  newsDetails!: NewsDetails;
}