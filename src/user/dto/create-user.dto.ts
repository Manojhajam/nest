import { IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string | undefined;
    
    @IsString()
    email: string | undefined;

    @IsString()
    password: string | undefined;
}
