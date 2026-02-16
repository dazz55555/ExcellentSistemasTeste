import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { IsCnpj } from "src/common/validators/is-cnpj.validator";

export class CreateClientDto {
    @ApiProperty({ example: 'Empresa teste' })
    @IsNotEmpty()
    social_reason: string;

    @ApiProperty({ example: '34.199.462/0001-00' })
    @IsCnpj()
    cnpj: string;

    @ApiProperty({ example: 'empresa@teste.com' })
    @IsEmail()
    email: string;
}
