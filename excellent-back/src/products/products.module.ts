import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from './entities/product-images.entity';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductRepository } from './products.repository';
import { CreateProductService } from './services/create-product.service';
import { DeleteProductService } from './services/delete-product.service';
import { GetAllProductsService } from './services/get-all-products.service';
import { GetOneProductService } from './services/get-one-product.service';
import { UpdateProductService } from './services/update-product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductImage]),
  ],
  controllers: [ProductsController],
  providers: [
    ProductRepository,

    CreateProductService,
    GetAllProductsService,
    GetOneProductService,
    UpdateProductService,
    DeleteProductService,
  ],
})
export class ProductsModule { }
