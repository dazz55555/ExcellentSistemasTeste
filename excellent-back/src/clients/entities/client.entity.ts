import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clients')
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    social_reason: string;

    @Column({ unique: true, nullable: false })
    cnpj: string;

    @Column({ unique: true, nullable: false })
    email: string;
}
