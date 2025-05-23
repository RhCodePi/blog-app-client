import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {

  constructor(private jwtHelper: JwtHelperService) { }

  identityCheck(){
      const token: string = localStorage.getItem("access_token");
  
      let expired: boolean;
      try {
        expired = this.jwtHelper.isTokenExpired(token) 
      } catch (error) {
        expired = true
      }
  
      _isAuthenticated = token != null && !expired;
    }
  
    get isAuthenticated(): boolean {
      return _isAuthenticated;
    }
}

export let _isAuthenticated: boolean;