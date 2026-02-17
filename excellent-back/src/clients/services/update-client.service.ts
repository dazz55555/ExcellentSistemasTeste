import { BadRequestException, Injectable } from "@nestjs/common";
import { CnpjGateway } from "src/CNPJws/gateways/cnpj.gateway";
import { ClientRepository } from "../client.repository";
import { UpdateClientDto } from "../dto/update-client.dto";
import { Client } from "../entities/client.entity";

@Injectable()
export class UpdateClientService {
    constructor(
        private readonly cnpjProvider: CnpjGateway,
        private readonly clientRepository: ClientRepository
    ) { }

    // podemos utilizar uma função com objeto para facilitar a visualização
    async run({ id, updateClientDto }: { id: number, updateClientDto: UpdateClientDto }) {
        if (!id) throw new BadRequestException('id is required');

        const clientExists = await this.clientRepository.findById(id);
        if (!clientExists) throw new BadRequestException('Client not found');

        const clientCnpjExists = await this.clientRepository.findByCnpj(updateClientDto.cnpj);
        if (clientCnpjExists) throw new BadRequestException('Client already exists');


        const client = new Client();
        client.id = id;
        client.cnpj = updateClientDto.cnpj;

        const clientFromCnpj = await this.cnpjProvider.getCnpjData(updateClientDto.cnpj);
        if (!clientFromCnpj) throw new BadRequestException('CNPJ not found in database');

        client.social_reason = clientFromCnpj.razao_social;
        client.email = clientFromCnpj.estabelecimento.email;

        return await this.clientRepository.update(client);
    }
}
