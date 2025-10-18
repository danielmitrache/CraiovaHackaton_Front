import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface RegisterRequest {
  accountType: 'user' | 'service';
  email: string;
  password: string;
  fullName?: string;
  serviceName?: string;
  serviceCUI?: string;
  location?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  keepSignedIn?: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
    accountType: 'user' | 'service';
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth'; // TODO: Replace with actual API URL

  constructor(private http: HttpClient) {}

  /**
   * Register a new user or service account
   */
  register(data: RegisterRequest): Observable<AuthResponse> {
    // TODO: Replace with actual HTTP call when backend is ready
    // return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data);

    // Simulated API call for development
    return of({
      success: true,
      message: data.accountType === 'user'
        ? 'Welcome aboard! Your account has been created.'
        : 'Welcome! Your service account has been created.',
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: 'user-' + Date.now(),
        email: data.email,
        name: data.accountType === 'user' ? data.fullName! : data.serviceName!,
        accountType: data.accountType
      }
    }).pipe(delay(1500)); // Simulate network delay
  }

  /**
   * Login user
   */
  login(data: LoginRequest): Observable<AuthResponse> {
    // TODO: Replace with actual HTTP call when backend is ready
    // return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data);

    // Simulated API call for development
    return of({
      success: true,
      message: 'Welcome back! Your car misses you.',
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: 'user-' + Date.now(),
        email: data.email,
        name: 'John Doe',
        accountType: 'user' as 'user' | 'service'
      }
    }).pipe(delay(1500)); // Simulate network delay
  }

  /**
   * Logout user
   */
  logout(): Observable<void> {
    // TODO: Implement actual logout logic
    localStorage.removeItem('auth_token');
    return of(void 0);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  /**
   * Store authentication token
   */
  storeToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  /**
   * Get authentication token
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}
