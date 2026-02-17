import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductRepository {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) { }

    async save(product: Product): Promise<Product> {
        return this.productRepository.save(product);
    }

    async findById(id: number): Promise<Product | null> {
        return this.productRepository.findOne({ where: { id } });
    }

    async findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async update(id: number, product: Product): Promise<Product | null> {
        await this.productRepository.update(id, product);
        return this.productRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<void> {
        await this.productRepository.delete({ id });
    }
}
