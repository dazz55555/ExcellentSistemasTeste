import { Injectable } from "@nestjs/common";
import * as fs from 'fs';
import path from "path";
import { CreateProductDto } from "../dto/create-product.dto";
import { Product } from "../entities/product.entity";
import { ProductRepository } from "../products.repository";

@Injectable()
export class CreateProductService {
    constructor(
        private readonly productRepository: ProductRepository,
    ) { }

    async run(createProductDto: CreateProductDto, files: Express.Multer.File[]) {
        try {
            const product = new Product();

            product.description = createProductDto.description;
            product.price = createProductDto.price;
            product.stock = createProductDto.stock;

            await this.productRepository.save(product);

            const uploadPath = path.resolve(
                __dirname,
                '..',
                '..',
                'uploads',
                'products',
                String(product.id),
            );

            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }

            const imagePaths: string[] = [];

            for (const file of files) {
                console.log('size:', file.size);
                console.log('buffer exists:', !!file.buffer);
                const filePath = path.join(uploadPath, file.originalname);

                fs.writeFileSync(filePath, file.buffer);
            }

            return product;
        } catch (error) {
            console.log("AAA")
            throw error
        }
    }
}
