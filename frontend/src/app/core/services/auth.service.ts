import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this.loadUserFromToken(token);
    }
  }

  private loadUserFromToken(token: string) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    this.currentUserSubject.next({
      id: payload.id,
      email: payload.email,
      name: payload.name,
      role: payload.role,
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        this.loadUserFromToken(response.token);
      })
    );
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/register`, { name, email, password })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('token', response.token);
          this.loadUserFromToken(response.token);
        })
      );
  }

  loginWithGoogle() {
    window.location.href = `${this.apiUrl}/google`;
  }

  loginWithFacebook() {
    window.location.href = `${this.apiUrl}/facebook`;
  }

  loginWithMicrosoft() {
    window.location.href = `${this.apiUrl}/microsoft`;
  }

  handleAuthCallback(token: string) {
    localStorage.setItem('token', token);
    this.loadUserFromToken(token);
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
