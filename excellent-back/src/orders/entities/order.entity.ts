import { Client } from 'src/clients/entities/client.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Client, (client) => client.orders, {
        onDelete: 'CASCADE',
    })
    client: Client;

    @OneToMany(() => OrderItem, (item) => item.order, {
        cascade: true,
    })
    items: OrderItem[];

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    total: number;

    @CreateDateColumn()
    createdAt: Date;
}
