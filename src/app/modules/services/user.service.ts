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

        if (response.user && response.user.id) { //guardo id en localStorage
          localStorage.setItem('userId', response.user.id.toString()); 
        } else {
          console.warn('El ID de usuario no se encontró en la respuesta');
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

  // Obtener todos los usuarios
  getUsers(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/users`, { headers });
  }

  // Obtener un usuario por ID
  getUserById(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/users/${id}`, { headers });
  }

  // registro usuario
  registerUser(user: { email: string; name: string; lastName: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // actualizar usuario por ID
  updateUser(id: number, user: { email?: string; name?: string; lastName?: string }): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/users/${id}`, user, { headers });
  }

  // buscar usuario ID
  searchByEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/find-by-email?email=${email}`);
  }
  
  
  //actualizar pass
  updatePassword(id: number, passwordUpdate: { newPassword: string; confirmPassword: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}/update-password`, passwordUpdate);
  }

  // eliminar un usuario por ID
   deleteUser(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/users/${id}`, { headers });
  }
  
}
