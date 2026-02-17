import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsPositive } from 'class-validator';

export class CreateOrderItemDto {

    @ApiProperty({ example: 1 })
    @Transform(({ value }) => Number(value))
    @IsNumber()
    @IsPositive()
    productId: number;

    @ApiProperty({ example: 5 })
    @Transform(({ value }) => Number(value))
    @IsNumber()
    @IsPositive()
    quantity: number;
}
