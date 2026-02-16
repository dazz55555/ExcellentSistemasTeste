import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CnpjWsGateway } from 'src/CNPJws/gateways/cnpj-ws.gateway';
import { CnpjGateway } from 'src/CNPJws/gateways/cnpj.gateway';
import { ClientRepository } from './client.repository';
import { ClientsController } from './clients.controller';
import { Client } from './entities/client.entity';
import { CreateClientService } from './services/create-client.service';
import { DeleteClientService } from './services/delete-client.service';
import { GetAllClientService } from './services/get-all-client.service';
import { GetOneClientService } from './services/get-one-client.service';
import { UpdateClientService } from './services/update-client.service';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientsController],
  providers: [
    ClientRepository,

    CreateClientService,
    GetAllClientService,
    GetOneClientService,
    UpdateClientService,
    DeleteClientService,
    {
      provide: CnpjGateway,
      useClass: CnpjWsGateway,
    },
  ],
  exports: [

  ]
})
export class ClientsModule { }
