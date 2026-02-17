import { Type } from "class-transformer";
import { IsNumber, IsString, MaxLength } from "class-validator";

export class CreateProductDto {
    @IsString()
    @MaxLength(255)
    description: string;

    @Type(() => Number)
    @IsNumber()
    price: number;

    @Type(() => Number)
    @IsNumber()
    stock: number;
}
