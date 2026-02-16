import { BadRequestException, Injectable } from "@nestjs/common";
import { ClientRepository } from "../client.repository";

@Injectable()
export class DeleteClientService {
    constructor(
        private readonly clientRepository: ClientRepository
    ) { }

    async run(id: number) {
        if (!id) throw new BadRequestException('id is required');
        return await this.clientRepository.delete(id);
    }
}
