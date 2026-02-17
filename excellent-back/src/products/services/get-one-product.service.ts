import { BadRequestException, Injectable } from "@nestjs/common";
import { ProductRepository } from "../products.repository";

@Injectable()
export class GetOneProductService {
    constructor(
        private readonly productRepository: ProductRepository
    ) { }

    async run(id: number) {
        if (!id) throw new BadRequestException('id is required');
        return await this.productRepository.findByIdWithImages(id);
    }
}
