import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';
import { OrderRepository } from './order.repository';
import { OrdersController } from './orders.controller';
import { CreateOrderService } from './services/create-order.service';
import { DeleteOrderService } from './services/delete-order.service';
import { GetallOrderService } from './services/get-all-order.service';
import { GetOneOrderService } from './services/get-one-order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem])
  ],
  controllers: [OrdersController],
  providers: [
    OrderRepository,

    CreateOrderService,
    GetallOrderService,
    GetOneOrderService,
    DeleteOrderService,
  ],
})
export class OrdersModule { }
