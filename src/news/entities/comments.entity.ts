import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { News } from "./news.entity";

@Table({
    tableName: "comments",
    paranoid: true,
})

export class Comments extends Model<Comments> {
   @ForeignKey(() => News)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    newsId!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    username!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    content!: string;
}