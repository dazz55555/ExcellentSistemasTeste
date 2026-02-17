import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { memoryStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesEnum } from 'src/common/enums/roles.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreateProductDocDto } from './dto/create-product-doc.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductService } from './services/create-product.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly createProductsService: CreateProductService
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

  @Get()
  findAll() {

  }

  @Get(':id')
  findOne(@Param('id') id: string) {

  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {

  }

  @Delete(':id')
  remove(@Param('id') id: string) {

  }
}
