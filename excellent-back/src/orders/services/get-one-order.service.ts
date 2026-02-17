import { BadRequestException, Injectable } from "@nestjs/common";
import { OrderRepository } from "../order.repository";

@Injectable()
export class GetOneOrderService {
    constructor(
        private readonly orderRepository: OrderRepository
    ) { }

    async run(id: number) {
        if (!id) throw new BadRequestException('id is required');
        return await this.orderRepository.getOneWithRelations(id);
    }
}
