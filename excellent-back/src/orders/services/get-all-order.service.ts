import { Injectable } from "@nestjs/common";
import { GetAllOrdersDto } from "../dto/get-all-orders.dto";
import { OrderRepository } from "../order.repository";

@Injectable()
export class GetallOrderService {
    constructor(
        private readonly orderRepository: OrderRepository
    ) { }

    async run(filters: GetAllOrdersDto) {
        const { items, total } = await this.orderRepository.getAll(filters);

        return {
            page: filters.page,
            limit: filters.limit,
            total: total,
            items
        }
    }
}
