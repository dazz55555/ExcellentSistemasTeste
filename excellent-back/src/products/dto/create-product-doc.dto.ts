import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDocDto {
    @ApiProperty({ example: 'Pão fatiado' })
    description: string;

    @ApiProperty({ example: 1.99 })
    price: number;

    @ApiProperty({ example: 500 })
    stock: number;

    @ApiProperty({
        type: 'string',
        format: 'binary',
        isArray: true,
    })
    images: any[];
}
