import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Min } from 'sequelize-typescript';

export class RegisterDto {
    @IsString()
    name!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(6)
    password!: string;
}

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @MinLength(6)
  password!: string;
}