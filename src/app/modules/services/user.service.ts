import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environments';


@Injectable({
  providedIn: 'root',
})
export class UserService {
 
  private apiUrl = environment.API_BASE_URL || 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = new URLSearchParams(); 
    body.set('email', email);
    body.set('password', password);

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post(`${this.apiUrl}/login`, body.toString(), { headers }).pipe(
      map((response: any) => {
  
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        return response;
      })
    );
  }


  logout(): void {
    localStorage.removeItem('token');
  }



  isAuthenticated(): boolean {
    if (typeof localStorage === 'undefined') {
      return false; 
    }

    const token = localStorage.getItem('token');
    return !!token; 
  }
  
}
