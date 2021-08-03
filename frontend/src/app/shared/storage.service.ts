import { Injectable } from '@angular/core';
import { WebService } from './web.service';
const User_key: string = "test";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  Result: any[];

  constructor(private webService: WebService) { }

  SignOut(): void {
    window.localStorage.clear();
  }

  public saveUserkey(user: string): void {
    window.localStorage.removeItem(User_key);
    window.localStorage.setItem(User_key, user);
  }
  public getUserkey(): string {
    return window.localStorage.getItem(User_key)
  }
  public saveUser(data: any) {
    window.localStorage.removeItem(User_key);
    window.localStorage.setItem(User_key, JSON.stringify(data));
  }

  public getUser() {
    return JSON.parse(window.localStorage.getItem(User_key));
  }

  public clearInfo() {
    window.localStorage.removeItem(User_key)
  }

  public clearAllLocalStorage() {
    window.localStorage.clear();
  }

  public addResult(data: any) {
  
  }
}
