import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../services/common/auth.service';
import {
  CustomToastrService,
  ToastrMessageType,
} from '../../services/common/custom-toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  constructor(
    public authService: AuthService,
    private toastr: CustomToastrService,
    private router: Router
  ) {}
  signOut() {
    localStorage.removeItem('access_token');
    this.authService.identityCheck();
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
