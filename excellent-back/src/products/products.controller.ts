import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { memoryStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesEnum } from 'src/common/enums/roles.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreateProductDocDto } from './dto/create-product-doc.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { GetAllProductDto } from './dto/get-all-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductService } from './services/create-product.service';
import { DeleteProductService } from './services/delete-product.service';
import { GetAllProductsService } from './services/get-all-products.service';
import { GetOneProductService } from './services/get-one-product.service';
import { UpdateProductService } from './services/update-product.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly createProductsService: CreateProductService,
    private readonly getAllProductsService: GetAllProductsService,
    private readonly getOneProductService: GetOneProductService,
    private readonly updateProductService: UpdateProductService,
    private readonly deleteProductService: DeleteProductService
  ) { }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateProductDocDto })
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    }),
  )
  create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createProductDto: CreateProductDto
  ) {
    return this.createProductsService.run(createProductDto, files);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @Get()
  getAll(@Query() query: GetAllProductDto) {
    return this.getAllProductsService.run(query);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getOneProductService.run(+id);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.updateProductService.run(+id, updateProductDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteProductService.run(+id);
  }
}
