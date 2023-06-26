import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginData } from '../model/developer/loginData';
import { AuthenticationResponse } from '../model/authenticationResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtKey = 'jwtToken';
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  public login(loginData: LoginData): Observable<AuthenticationResponse> {
    return this.httpClient.post<AuthenticationResponse>(`${this.apiServerUrl}/api/auth/authenticate`, loginData);
  }

  public setToken(token: string): void {
    console.log("setToken() called from auth service...")
    localStorage.setItem(this.jwtKey, token);
  }

  public getToken(): string {
    console.log("get token called from token service class")
    return localStorage.getItem(this.jwtKey);
  }

  public removeToken(): void {
      localStorage.removeItem(this.jwtKey);
      console.log("remove token called");
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    return token != null;
  }
}