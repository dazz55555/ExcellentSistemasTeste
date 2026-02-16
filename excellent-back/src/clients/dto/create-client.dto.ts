import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsCnpj } from "src/common/validators/is-cnpj.validator";

export class CreateClientDto {
    @ApiProperty({ example: '34.199.462/0001-00' })
    @IsCnpj()
    @Transform(({ value }) => {
        if (!value) return value;
        return value.replace(/\D/g, '');
    })
    cnpj: string;
}
