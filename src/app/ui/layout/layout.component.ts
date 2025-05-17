import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import {
  CustomToastrService,
  ToastrMessageType,
} from '../../services/common/custom-toastr.service';
import { Router } from '@angular/router';
import { AuthHelperService } from '../../services/helpers/auth-helper.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  constructor(
    public authHelper: AuthHelperService,
    private toastr: CustomToastrService,
    private router: Router
  ) {}
  signOut() {
    localStorage.removeItem('access_token');
    this.authHelper.identityCheck();
    this.router.navigate(['']);
    this.toastr.alert(
      'sign out success',
      'Sign Out',
      ToastrMessageType.SUCCESS,
      {
        progressBar: true,
      }
    );
  }
}
