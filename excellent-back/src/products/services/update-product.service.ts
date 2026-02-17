import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UpdateProductDto } from "../dto/update-product.dto";
import { ProductRepository } from "../products.repository";

@Injectable()
export class UpdateProductService {
    constructor(
        private readonly productRepository: ProductRepository,
    ) { }

    async run(id: number, updateProductDto: UpdateProductDto) {
        if (!id) {
            throw new BadRequestException('id is required');
        }

        const product = await this.productRepository.findById(id);

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        if (updateProductDto.price !== undefined) {
            product.price = updateProductDto.price;
        }

        if (updateProductDto.stock !== undefined) {
            product.stock = updateProductDto.stock;
        }

        if (updateProductDto.description !== undefined) {
            product.description = updateProductDto.description;
        }

        await this.productRepository.save(product);

        return product;
    }
}
