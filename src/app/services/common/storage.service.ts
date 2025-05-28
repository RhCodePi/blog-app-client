import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService implements OnInit {
  private isBrowser!: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  ngOnInit(): void {}

  getLocalStorage(key: string): string | null {
    return this.isBrowser ? localStorage.getItem(key) : null;
  }
}
