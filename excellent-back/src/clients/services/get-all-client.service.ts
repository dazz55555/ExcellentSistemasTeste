import { Injectable } from "@nestjs/common";
import { FormatCnpj } from "src/common/helpers/format-cnpj.function";
import { ClientRepository } from "../client.repository";
import { GetAllClientDto } from "../dto/get-all-client.dto";
import { ResponseGetAllClientDto } from "../dto/response-get-all-client.dto";
import { Client } from "../entities/client.entity";

@Injectable()
export class GetAllClientService {
    constructor(
        private readonly clientRepository: ClientRepository,
    ) { }

    async run(query: GetAllClientDto): Promise<ResponseGetAllClientDto<Partial<Client>>> {
        const { items, total } = await this.clientRepository.findAll(query);

        return {
            page: query.page,
            limit: query.limit,
            total: total,
            items: items.map(c => {
                c.cnpj = FormatCnpj(c.cnpj);
                return c
            })
        }
    }
}
