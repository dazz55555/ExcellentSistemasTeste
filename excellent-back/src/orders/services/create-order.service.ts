import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Client } from 'src/clients/entities/client.entity';
import { DataSource } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderItem } from '../entities/order-item.entity';
import { Order } from '../entities/order.entity';

@Injectable()
export class CreateOrderService {
    constructor(private readonly dataSource: DataSource) { }

    async run(createOrderDto: CreateOrderDto) {
        const { clientId, items } = createOrderDto;

        if (!items?.length) {
            throw new BadRequestException('Order must have at least one product!');
        }

        return await this.dataSource.transaction(async (manager) => {

            const client = await manager.findOne(Client, {
                where: { id: clientId },
            });

            if (!client) {
                throw new NotFoundException('Client not found');
            }

            const order = manager.create(Order, {
                client: client,
                total: 0,
            });

            await manager.save(order);

            let total = 0;
            const orderItems: OrderItem[] = [];

            for (const item of items) {
                const product = await manager.findOne(Product, {
                    where: { id: item.productId },
                });

                if (!product) {
                    throw new NotFoundException(
                        `Product with id: ${item.productId}, not found`,
                    );
                }

                if (product.stock < item.quantity) {
                    throw new BadRequestException(
                        `Insufficient stock for product ${product.id}`,
                    );
                }

                const subtotal = Number(product.price) * item.quantity;

                const orderItem = manager.create(OrderItem, {
                    order,
                    product,
                    quantity: item.quantity,
                    unitPrice: product.price,
                    subtotal,
                });

                orderItems.push(orderItem);

                product.stock -= item.quantity;
                await manager.save(product);

                total += subtotal;
            }

            await manager.save(orderItems);

            order.total = total;
            await manager.save(order);

            return order;
        });
    }


}
