import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import axios from "axios";
import { CnpjGateway } from "./cnpj.gateway";

@Injectable()
export class CnpjWsGateway implements CnpjGateway {
    constructor() { }

    async getCnpjData(cnpj: string): Promise<any> {
        try {
            console.log("AAAAAAAAAAA", cnpj);
            const response = await axios.get(
                `https://publica.cnpj.ws/cnpj/${cnpj}`
            );

            return response.data;
        } catch (error) {
            if (error.status === 429) {
                throw new BadRequestException(error.detalhes);
            }
            if (error.status === 404) {
                throw new NotFoundException("CNJP not found in database");
            }
            throw error
        }
    }
}
