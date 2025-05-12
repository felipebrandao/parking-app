import {Injectable} from '@angular/core';

const KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string) {
    return sessionStorage.setItem(KEY, token);
  }

  deleteToken() {
    sessionStorage.removeItem(KEY);
  }

  getToken() {
    return sessionStorage.getItem(KEY) ?? '';
  }

  hasToken() {
    return !!this.getToken();
  }
}
