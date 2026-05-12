import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateCustomerDto {
    @IsString()
    name: string | undefined;

    @IsInt()
    age: number | undefined;
}