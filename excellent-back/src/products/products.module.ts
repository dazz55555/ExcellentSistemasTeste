import { Module } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductRepository } from './products.repository';
import { CreateProductService } from './services/create-product.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ProductsController],
  providers: [
    ProductRepository,

    CreateProductService,
  ],
})
export class ProductsModule { }
