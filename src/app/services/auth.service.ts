import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  private apiUrl = 'http://localhost:8080/Authentication/login';
  private loggedIn = new BehaviorSubject<boolean>(this.checkToken());

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, { email, password }).pipe(
      tap(response => {
        if (response && response.id) {
          localStorage.setItem('userToken', response.id); // Save token or unique identifier
          this.loggedIn.next(true); // Update the BehaviorSubject
        }
      })
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  // Logout method to clear stored token
  logout(): void {
    localStorage.removeItem('userToken'); // Remove token from storage
    this.loggedIn.next(false); // Update the BehaviorSubject
  }

  // Helper to check if the token exists in localStorage
  private checkToken(): boolean {
    return !!localStorage.getItem('userToken'); // Check if the token exists
  }
}

export interface LoginResponse {
  id: string; 
  type: string;    
}
