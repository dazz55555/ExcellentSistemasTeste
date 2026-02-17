import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-images.entity";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description?: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
    })
    price: number;

    @Column({ nullable: false })
    stock: number;

    @OneToMany(() => ProductImage, (image) => image.product, {
        cascade: true,
    })
    images: ProductImage[];
}
