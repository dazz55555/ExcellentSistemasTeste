import { Injectable } from "@nestjs/common";
import { ClientRepository } from "../client.repository";

@Injectable()
export class GetAllClientService {
    constructor(
        private readonly clientRepository: ClientRepository,
    ) { }

    async run() {
        const clients = await this.clientRepository.findAll();
        const count = await this.clientRepository.countAll();

        return {
            page: 1,
            per_page: count,
            total: count,
            items: clients.map(c => {
                const { id, ...rest } = c;
                return rest;
            })
        }
    }
}
