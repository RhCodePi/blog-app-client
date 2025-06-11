import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthHelperService } from '../services/helpers/auth-helper.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authHelper = inject(AuthHelperService);
  const router = inject(Router);

  authHelper.identityCheck();

  if (!authHelper.isAuthenticated) {
    router.navigate(['login'], {queryParams: {returnUrl: state.url}});

    return false;
  }

  return true;
};
