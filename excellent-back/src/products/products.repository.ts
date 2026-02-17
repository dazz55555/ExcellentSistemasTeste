import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetAllProductDto } from './dto/get-all-product.dto';
import { ProductImage } from './entities/product-images.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductRepository {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(ProductImage)
        private productImageRepository: Repository<ProductImage>,
    ) { }

    async save(product: Product): Promise<Product> {
        return this.productRepository.save(product);
    }

    async saveImage(productImage: ProductImage[]): Promise<ProductImage[]> {
        return this.productImageRepository.save(productImage);
    }

    async findById(id: number): Promise<Product | null> {
        return this.productRepository.findOne({ where: { id } });
    }

    async findByIdWithImages(id: number): Promise<Product | null> {
        return this.productRepository.findOne({
            where: { id },
            relations: ['images'],
        });
    }

    async findAll(filters: GetAllProductDto): Promise<any> {
        const [data, total] = await this.productRepository.findAndCount({
            relations: ['images'],
            skip: (filters.page - 1) * filters.limit,
            take: filters.limit,
        });

        return {
            items: data,
            total,
        };

    }

    async update(id: number, product: Product): Promise<Product | null> {
        await this.productRepository.update(id, product);
        return this.productRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.productRepository.delete({ id });
    }
}
