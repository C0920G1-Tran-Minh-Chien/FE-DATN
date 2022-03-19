import {Injectable} from '@angular/core';


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];

  constructor() {
  }

  signOut() {
    window.localStorage.clear();
  }

  public saveToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    return JSON.parse(localStorage.getItem(USER_KEY));
  }

  public getAuthorities(): string[] {
    this.roles = [];
    if (window.localStorage.getItem(USER_KEY)) {
      console.log(JSON.parse(window.localStorage.getItem(USER_KEY)).roles[0]);
      JSON.parse(window.localStorage.getItem(USER_KEY)).roles.forEach(authority => {
        this.roles.push(authority);
      });
    }
    return this.roles;
  }
}
