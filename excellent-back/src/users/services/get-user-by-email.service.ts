import { Injectable } from "@nestjs/common";
import { User } from "../user.entity";
import { UserRepository } from "../user.repository";


@Injectable()
export class GetUserByEmailService {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async run(email: string): Promise<User | null> {
        return await this.userRepository.findByEmail(email);
    }
}
