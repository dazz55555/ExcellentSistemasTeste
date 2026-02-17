import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/v1/auth';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {
      email,
      password
    });
  }

  isAuthenticated(): boolean {
    console.log(localStorage.getItem('access-token'))
    return localStorage.getItem('access-token') != null;
  }

  getToken(): string | null {
    return localStorage.getItem('access-token');
  }

  logout() {
    localStorage.removeItem('access-token');
  }
}
