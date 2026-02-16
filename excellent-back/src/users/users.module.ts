import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GetUserByEmailService } from "./services/get-user-by-email.service";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    controllers: [

    ],
    providers: [
        UserRepository,

        GetUserByEmailService,
    ],
    exports: [
        GetUserByEmailService,
    ]
})
export class UsersModule { }
