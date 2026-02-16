import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @ApiProperty({ example: 'edu@email.com.br' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '123' })
    @IsString()
    @IsNotEmpty()
    password: string;
}
