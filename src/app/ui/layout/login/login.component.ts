import { Component } from '@angular/core';
import { UserService } from '../../../services/common/models/user.service';
import {
  CustomToastrService,
  ToastrMessagePositon,
  ToastrMessageType,
} from '../../../services/common/custom-toastr.service';
import { AuthHelperService } from '../../../services/helpers/auth-helper.service';
import { AuthService } from '../../../services/common/auth.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private toastr: CustomToastrService,
    private authHelper: AuthHelperService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async login() {
    const usernameOrEmail = document.getElementById(
      'emailOrUsername'
    ) as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    const result = await this.authService.login(
      usernameOrEmail.value,
      password.value
    );

    if (result === undefined) return;

    if (result.isSuccess) {
      if (result.token) {
        localStorage.setItem('access_token', result.token.accessToken);
        localStorage.setItem('refresh_token', result.token.refreshToken);
      }

      this.authHelper.identityCheck();


      var returnUrl: string|null = this.route.snapshot.queryParams['returnUrl']

      if(returnUrl)
        this.router.navigate([returnUrl]);

      this.toastr.alert(result.message, 'Success', ToastrMessageType.SUCCESS, {
        progressBar: true,
      });
    } else {
      this.toastr.alert(result.message, 'Error', ToastrMessageType.ERROR, {
        position: ToastrMessagePositon.BOTTOM_RIGHT,
        progressBar: true,
      });
    }
  }
}
