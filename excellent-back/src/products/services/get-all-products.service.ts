import { Injectable } from "@nestjs/common";
import { GetAllProductDto } from "../dto/get-all-product.dto";
import { ProductRepository } from "../products.repository";

@Injectable()
export class GetAllProductsService {
    constructor(
        private readonly productRepository: ProductRepository
    ) { }

    async run(query: GetAllProductDto): Promise<any> {
        const { items, total } = await this.productRepository.findAll(query);

        return {
            page: query.page,
            limit: query.limit,
            total: total,
            items: items
        }

    }
}
