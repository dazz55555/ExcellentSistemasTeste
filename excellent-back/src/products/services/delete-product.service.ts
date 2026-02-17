import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import { DataSource } from "typeorm";
import { ProductImage } from "../entities/product-images.entity";
import { Product } from "../entities/product.entity";

@Injectable()
export class DeleteProductService {
    constructor(
        private readonly dataSource: DataSource,
    ) { }

    async run(id: number) {
        if (!id) {
            throw new BadRequestException("id is required");
        }

        const uploadPath = path.resolve(
            __dirname,
            "..",
            "..",
            "uploads",
            "products",
            String(id),
        );

        await this.dataSource.transaction(async (manager) => {

            const product = await manager.findOne(Product, {
                where: { id },
            });

            if (!product) {
                throw new NotFoundException("Product not found");
            }

            await manager.delete(ProductImage, { product: { id } });
            await manager.delete(Product, { id });
        });

        if (fs.existsSync(uploadPath)) {
            fs.rmSync(uploadPath, { recursive: true, force: true });
        }

        return {
            success: true,
        };
    }
}
