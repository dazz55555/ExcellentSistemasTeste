import { Injectable } from "@nestjs/common";
import { OrderRepository } from "../order.repository";

@Injectable()
export class DeleteOrderService {
    constructor(
        private readonly orderRepository: OrderRepository
    ) { }

    async run(id: number) {

    }
}
