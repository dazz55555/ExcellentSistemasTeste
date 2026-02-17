export interface OrderClient {
    id: number;
    social_reason: string;
    cnpj: string;
    email: string;
}

export interface Order {
    id: number;
    client: OrderClient;
    total: string;
    createdAt: string;
}
