import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CustomToastrService {
  constructor(private toastr: ToastrService) {}

  alert(
    message: string,
    title: string,
    type: ToastrMessageType,
    messageOption?: Partial<ToastrMessageOption>
  ) {
    
    let defaultMessageOption: ToastrMessageOption = {
      closeButton: true,
      timeOut: 2000,
      position: ToastrMessagePositon.TOP_RIGHT,
      tapToDismiss: true,
      progressBar: false,
      progressAnimation: ToastrProgressAnimation.DECREASING,
    };

    var options: Partial<ToastrMessageOption> = { ...defaultMessageOption, ...messageOption }; // Object Spread Syntax 

    this.toastr[type](message, title, {
      closeButton: options.closeButton,
      timeOut: options.timeOut,
      positionClass: options.position,
      tapToDismiss: options.tapToDismiss,
      progressBar: options.progressBar,
      progressAnimation: options.progressAnimation,
    });
  }
}

export enum ToastrMessageType {
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
}

export class ToastrMessageOption {
  closeButton: boolean;
  timeOut: number;
  position: ToastrMessagePositon;
  tapToDismiss: boolean;
  progressBar: boolean;
  progressAnimation: ToastrProgressAnimation;
}

export enum ToastrMessagePositon {
  TOP_RIGHT = 'toast-top-right',
  TOP_LEFT = 'toast-top-left',
  TOP_FULL_WIDTH = 'toast-top-full-width',
  TOP_CENTER = 'toast-top-center',
  BOTTOM_RIGHT = 'toast-bottom-right',
  BOTTOM_LEFT = 'toast-bottom-left',
  BOTTOM_FULL_WIDTH = 'toast-bottom-full-width',
  BOTTOM_CENTER = 'toast-bottom-center',
}

export enum ToastrProgressAnimation {
  DECREASING = 'decreasing',
  INCREASING = 'increasing',
}
