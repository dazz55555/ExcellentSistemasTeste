import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import * as fs from 'fs';
import path from "path";
import { DataSource } from "typeorm";
import { CreateProductDto } from "../dto/create-product.dto";
import { ProductImage } from "../entities/product-images.entity";
import { Product } from "../entities/product.entity";

@Injectable()
export class CreateProductService {
    constructor(
        private readonly dataSource: DataSource,
    ) { }

    async run(createProductDto: CreateProductDto, files: Express.Multer.File[]) {
        return await this.dataSource.transaction(async (manager) => {

            const product = manager.create(Product, {
                description: createProductDto.description,
                price: createProductDto.price,
                stock: createProductDto.stock,
            });

            await manager.save(product);

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

            const productImages: ProductImage[] = [];

            for (const file of files ?? []) {
                const fileName = `${randomUUID()}-${file.originalname}`;
                const filePath = path.join(uploadPath, fileName);

                fs.writeFileSync(filePath, file.buffer);

                const image = manager.create(ProductImage, {
                    url: `/uploads/products/${product.id}/${fileName}`,
                    product: product,
                });

                productImages.push(image);
            }

            await manager.save(productImages);

            return product;
        });
    }
}
