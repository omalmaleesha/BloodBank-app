import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/Authentication/login'

  constructor(private http:HttpClient) {}
   
  login(email: string, password: string): Observable<string> {
    return this.http.post(this.apiUrl, { email, password }, { responseType: 'text' });
  }



}
