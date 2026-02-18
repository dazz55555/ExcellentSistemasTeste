import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../../../helpers/paginated-response.interface';
import { Client } from './clients.model';

@Injectable({
    providedIn: 'root'
})
export class ClientsService {

    private apiUrl = 'http://localhost:3000/api/v1/clients';

    constructor(private http: HttpClient) { }

    getClients(page: number, limit: number): Observable<PaginatedResponse<Client>> {
        const params = new HttpParams()
            .set('page', page)
            .set('limit', limit);

        return this.http.get<PaginatedResponse<Client>>(this.apiUrl, { params });
    }

    createClient(data: any) {
        return this.http.post(this.apiUrl, data);
    }

    deleteClient(id: number) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

}
