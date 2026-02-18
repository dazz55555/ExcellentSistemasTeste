import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../../../helpers/paginated-response.interface';
import { Product } from './product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    private apiUrl = 'http://localhost:3000/api/v1/products';

    constructor(private http: HttpClient) { }

    getProducts(page: number, limit: number): Observable<PaginatedResponse<Product>> {
        const params = new HttpParams()
            .set('page', page)
            .set('limit', limit);

        return this.http.get<PaginatedResponse<Product>>(this.apiUrl, { params });
    }

    getProductById(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/${id}`);
    }

    createProduct(formData: FormData): Observable<any> {
        return this.http.post(this.apiUrl, formData);
    }

    deleteProduct(id: number) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
