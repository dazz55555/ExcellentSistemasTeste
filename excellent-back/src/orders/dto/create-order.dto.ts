import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNumber, IsPositive, ValidateNested } from "class-validator";
import { CreateOrderItemDto } from "./create-order-item.dto";

export class CreateOrderDto {
    @ApiProperty({ example: 1 })
    @Transform(({ value }) => Number(value))
    @IsNumber()
    @IsPositive()
    clientId: number;

    @ApiProperty({
        type: [CreateOrderItemDto],
    })
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    items: CreateOrderItemDto[];
}
