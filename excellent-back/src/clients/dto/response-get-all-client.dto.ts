
export class ResponseGetAllClientDto<T> {
    page: number
    limit: number
    total: number
    items: Array<T>
}
