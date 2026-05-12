import {
    Column,
    DataType,
    Table,
    Model,
  } from "sequelize-typescript";
  
  @Table({
    tableName: "books",
    paranoid: true,
  })
  export class Book extends Model<Book> {
    @Column({
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    })
    declare id: number;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    declare title: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    declare author: string;
  
}
