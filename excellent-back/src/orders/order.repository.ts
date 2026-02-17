import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GetAllOrdersDto } from "./dto/get-all-orders.dto";
import { Order } from "./entities/order.entity";

@Injectable()
export class OrderRepository {
    constructor(
        @InjectRepository(Order)
        private order: Repository<Order>,
    ) { }

    async getAll(filters: GetAllOrdersDto) {
        const [orders, total] = await this.order.findAndCount({
            relations: {
                client: true,
            },
            order: {
                createdAt: 'DESC',
            },
            skip: (filters.page - 1) * filters.limit,
            take: filters.limit,
        });

        return {
            items: orders,
            total,
        };
    }

    async getAllWithRelations(filters: GetAllOrdersDto) {
        const [orders, total] = await this.order.findAndCount({
            relations: {
                client: true,
                items: {
                    product: true,
                },
            },
            order: {
                createdAt: 'DESC',
            },
            skip: (filters.page - 1) * filters.limit,
            take: filters.limit,
        });

        return {
            items: orders,
            total,
        };
    }

    async getOneWithRelations(id: number) {
        return await this.order.findOne({
            where: { id },
            relations: {
                client: true,
                items: {
                    product: {
                        images: true
                    },
                },
            }
        });
    }

    async delete(id: number) {
        return await this.order.delete(id);
    }
}
