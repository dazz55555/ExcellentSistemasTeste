import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesEnum } from 'src/common/enums/roles.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetAllOrdersDto } from './dto/get-all-orders.dto';
import { CreateOrderService } from './services/create-order.service';
import { DeleteOrderService } from './services/delete-order.service';
import { GetallOrderService } from './services/get-all-order.service';
import { GetOneOrderService } from './services/get-one-order.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly createOrderService: CreateOrderService,
    private readonly getAllOrderService: GetallOrderService,
    private readonly getOneOrderService: GetOneOrderService,
    private readonly deleteOrderService: DeleteOrderService
  ) { }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.createOrderService.run(createOrderDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @Get()
  findAll(@Query() filters: GetAllOrdersDto) {
    return this.getAllOrderService.run(filters);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getOneOrderService.run(+id);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteOrderService.run(+id);
  }
}
