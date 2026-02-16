import { BadRequestException, Injectable } from "@nestjs/common";
import { CnpjGateway } from "../../CNPJws/gateways/cnpj.gateway";
import { ClientRepository } from "../client.repository";
import { CreateClientDto } from "../dto/create-client.dto";
import { Client } from "../entities/client.entity";

@Injectable()
export class CreateClientService {
    constructor(
        private readonly cnpjWsProvider: CnpjGateway,
        private readonly clientRepository: ClientRepository
    ) { }

    async run(createClientDto: CreateClientDto): Promise<Client> {
        const clientExists = await this.clientRepository.findByCnpj(createClientDto.cnpj);
        if (clientExists) throw new BadRequestException('Client already exists');

        const clientFromCnpj = await this.cnpjWsProvider.getCnpjData(createClientDto.cnpj);
        if (!clientFromCnpj) throw new BadRequestException('CNPJ not found in database');

        const client = new Client();
        client.social_reason = clientFromCnpj.razao_social;
        client.cnpj = createClientDto.cnpj;
        client.email = clientFromCnpj.estabelecimento.email;

        return await this.clientRepository.save(client);
    }
}
