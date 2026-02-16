export abstract class CnpjGateway {
    abstract getCnpjData(cnpj: string): Promise<any>;
}
