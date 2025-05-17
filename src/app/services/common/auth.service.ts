import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { LoginUser } from '../../contracts/users/login-user';
import { firstValueFrom } from 'rxjs';
import { Token } from '../../contracts/token/token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClientService: HttpClientService) {}

  async login(usernameOrEmail: string, password: string): Promise<LoginUser> {
    const observable = this.httpClientService.post<
      LoginUser | { usernameOrEmail: string; password: string }
    >(
      {
        controller: 'auths',
      },
      {
        password: password,
        usernameOrEmail: usernameOrEmail,
      }
    );

    return (await firstValueFrom(observable)) as LoginUser;
  }

  async loginWithRefreshToken(
    refreshToken: string,
  ): Promise<any> {
    const observable = this.httpClientService.post<Token | string>(
      {
        controller: 'auths',
        action: 'loginwithrefreshtoken',
      },
      { refreshToken: refreshToken }
    );

    var response = (await firstValueFrom(observable)) as Token;

    if (response) {
      localStorage.setItem('access_token', response.accessToken),
      localStorage.setItem('refresh_token', response.refreshToken);
    }

    return response ? true : false;
  }
}
