import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from '../common/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService{
  constructor(
    private jwtHelper: JwtHelperService,
    private storageService: StorageService) {
   }
 
  identityCheck(){
      const token: string = this.storageService.getLocalStorage('access_token');

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