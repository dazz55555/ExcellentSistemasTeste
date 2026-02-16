import { BadRequestException, Injectable } from "@nestjs/common";
import { ClientRepository } from "../client.repository";
import { UpdateClientDto } from "../dto/update-client.dto";
import { Client } from "../entities/client.entity";

@Injectable()
export class UpdateClientService {
    constructor(
        private readonly clientRepository: ClientRepository
    ) { }

    // podemos utilizar uma função com objeto para facilitar a visualização
    async run({ id, updateClientDto }: { id: number, updateClientDto: UpdateClientDto }) {
        if (!id) throw new BadRequestException('id is required');

        const clientExists = await this.clientRepository.findById(id);
        if (!clientExists) throw new BadRequestException('Client not found');

        if (updateClientDto.cnpj) {
            const clientCnpjExists = await this.clientRepository.findByCnpj(updateClientDto.cnpj);
            if (clientCnpjExists) throw new BadRequestException('Client already exists');
        }
        if (updateClientDto.email) {
            const clientEmailExists = await this.clientRepository.findByEmail(updateClientDto.email);
            if (clientEmailExists) throw new BadRequestException('Client already exists');
        }

        const client = new Client();
        client.id = id;
        if (updateClientDto.social_reason) client.social_reason = updateClientDto.social_reason;
        if (updateClientDto.cnpj) client.cnpj = updateClientDto.cnpj;
        if (updateClientDto.email) client.email = updateClientDto.email;

        await this.clientRepository.update(client);

        const clientUpdated = await this.clientRepository.findById(id);
        return clientUpdated;
    }
}
