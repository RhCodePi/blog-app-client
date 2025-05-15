import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from '../../../entities/user';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateUser } from '../../../contracts/users/create-user';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomToastrService, ToastrMessagePositon, ToastrMessageType } from '../custom-toastr.service';
import { LoginUser } from '../../../contracts/users/login-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService, private toastr: CustomToastrService) { }

  async create(user: User): Promise<CreateUser> {
    const observable: Observable<CreateUser | User> = this.httpClientService.post<CreateUser | User>({
      controller: "users"
    }, user);

    return await firstValueFrom(observable)
      .catch((error : HttpErrorResponse) => {
        this.toastr.alert(error.message, `${error.name}`, ToastrMessageType.ERROR, {
          position: ToastrMessagePositon.BOTTOM_RIGHT,
        })
      }) as CreateUser
  }

  async login(usernameOrEmail: string, password: string): Promise<LoginUser> { 
    const observable = this.httpClientService.post<LoginUser | {usernameOrEmail: string, password: string}>({
      controller: 'auths',
    }, {
      password: password,
      usernameOrEmail: usernameOrEmail
    })

    return await firstValueFrom(observable) as LoginUser
  }
}
