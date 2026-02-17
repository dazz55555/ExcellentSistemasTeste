import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../../../helpers/paginated-response.interface';
import { Order } from './orders.model';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {

    private apiUrl = 'http://localhost:3000/api/v1/orders';

    constructor(private http: HttpClient) { }

    getOrders(page: number, limit: number): Observable<PaginatedResponse<Order>> {
        const params = new HttpParams()
            .set('page', page)
            .set('limit', limit);

        return this.http.get<PaginatedResponse<Order>>(this.apiUrl, { params });
    }
}
