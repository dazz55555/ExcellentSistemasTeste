import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('productImages')
export class ProductImage {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    url: string;

    @ManyToOne(() => Product, (product) => product.images, {
        onDelete: 'CASCADE',
    })
    product: Product;

    @CreateDateColumn()
    createdAt: Date;
}
