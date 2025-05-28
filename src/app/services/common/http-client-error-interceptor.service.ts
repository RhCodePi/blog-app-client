import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import {
  CustomToastrService,
  ToastrMessagePositon,
  ToastrMessageType,
} from './custom-toastr.service';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class HttpClientErrorInterceptorService implements HttpInterceptor {
  constructor(
    private toastr: CustomToastrService,
    private authService: AuthService,
    private storageService: StorageService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        errorSelection(
          error.message,
          error.status,
          this.toastr,
          this.authService,
          this.storageService
        );
        return of();
      })
    );
  }
}
function errorSelection(
  errorMessage: string,
  statusCode: number,
  toastr: CustomToastrService,
  authService: AuthService,
  storageService: StorageService
) {
  var errors = {
    [HttpStatusCode.BAD_REQUEST]: function () {
      toastr.alert(
        errorMessage + `\nStatus Code: ${statusCode}`,
        'Bad Request',
        ToastrMessageType.ERROR,
        {
          position: ToastrMessagePositon.BOTTOM_RIGHT,
        }
      );
    },
    [HttpStatusCode.UNAUTHORIZED]: async function () {
      var result = await authService.loginWithRefreshToken(
        storageService.getLocalStorage('refresh_token')
      );
      if (!result) {
        toastr.alert(
          errorMessage + `\nStatus Code: ${statusCode}`,
          'Unauthorized',
          ToastrMessageType.ERROR,
          {
            position: ToastrMessagePositon.BOTTOM_RIGHT,
          }
        );
      }
    },
    [HttpStatusCode.INTERNAL_SERVER_ERROR]: function () {
      toastr.alert(
        errorMessage + `\nStatus Code: ${statusCode}`,
        'Internal Server Error',
        ToastrMessageType.ERROR,
        {
          position: ToastrMessagePositon.BOTTOM_RIGHT,
        }
      );
    },
    default: function () {
      toastr.alert(
        'the client disconnects the connection.' +
          `\nStatus Code: ${statusCode}`,
        'Something went wrong',
        ToastrMessageType.ERROR,
        {
          position: ToastrMessagePositon.BOTTOM_RIGHT,
        }
      );
    },
  };

  return (errors[statusCode] || errors.default)();
}

export enum HttpStatusCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  INTERNAL_SERVER_ERROR = 500,
}
