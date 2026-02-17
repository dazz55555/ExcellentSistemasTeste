import { Order } from 'src/orders/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clients')
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    social_reason: string;

    @Column({ unique: true, nullable: false })
    cnpj: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @OneToMany(() => Order, (order) => order.client, { cascade: true })
    orders: Order[];
}
