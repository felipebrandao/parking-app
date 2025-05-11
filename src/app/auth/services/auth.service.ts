import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

interface AuthResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = environment.API_URL + '/auth';

  constructor(
    private http: HttpClient
  ) { }

  authenticate(email: string, password: string): Observable<HttpResponse<AuthResponse>> {
    const body = { email, password };
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, body, { observe: 'response' });
  }

}
