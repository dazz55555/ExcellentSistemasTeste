import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Client } from "./entities/client.entity";

@Injectable()
export class ClientRepository {
    constructor(
        @InjectRepository(Client)
        private client: Repository<Client>,
    ) { }

    async save(client: Client) {
        return await this.client.save(client);
    }

    async findById(id: number) {
        return await this.client.findOne({ where: { id } });
    }

    async findByCnpj(cnpj: string) {
        return await this.client.findOne({ where: { cnpj } });
    }

    async findByEmail(email: string) {
        return await this.client.findOne({ where: { email } });
    }

    async findByEmailOrCnpj(email: string, cnpj: string) {
        return await this.client.findOne({ where: { email, cnpj } });
    }
    async findAll() {
        return await this.client.find();
    }

    async countAll() {
        return await this.client.count();
    }

    async update(client: Client) {
        return await this.client.update(client.id, client);
    }

    async delete(id: number) {
        return await this.client.delete(id);
    }
}
