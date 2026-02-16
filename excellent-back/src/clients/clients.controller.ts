import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesEnum } from 'src/common/enums/roles.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { CreateClientService } from './services/create-client.service';
import { DeleteClientService } from './services/delete-client.service';
import { GetAllClientService } from './services/get-all-client.service';
import { GetOneClientService } from './services/get-one-client.service';
import { UpdateClientService } from './services/update-client.service';

@Controller('clients')
export class ClientsController {
  constructor(
    private readonly createClientService: CreateClientService,
    private readonly getAllClientService: GetAllClientService,
    private readonly getOneClientService: GetOneClientService,
    private readonly updateClientService: UpdateClientService,
    private readonly deleteClientService: DeleteClientService,
  ) { }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.createClientService.run(createClientDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @Get()
  findAll() {
    return this.getAllClientService.run();
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getOneClientService.run(+id);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.updateClientService.run({ id: +id, updateClientDto });
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.deleteClientService.run(+id);
  }
}
