import { BadRequestException, Injectable } from "@nestjs/common";
import { ClientRepository } from "../client.repository";
import { CreateClientDto } from "../dto/create-client.dto";
import { Client } from "../entities/client.entity";

@Injectable()
export class CreateClientService {
    constructor(
        private readonly clientRepository: ClientRepository
    ) { }

    async run(createClientDto: CreateClientDto): Promise<Client> {
        const clientExists = await this.clientRepository.findByEmailOrCnpj(createClientDto.email, createClientDto.cnpj);
        if (clientExists) throw new BadRequestException('Client already exists');

        const client = new Client();
        client.social_reason = createClientDto.social_reason;
        client.cnpj = createClientDto.cnpj;
        client.email = createClientDto.email;

        return await this.clientRepository.save(client);
    }
}
