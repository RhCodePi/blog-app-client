import { TestBed } from '@angular/core/testing';

import { HttpClientErrorInterceptorService } from './http-client-error-interceptor.service';

describe('HttpClientErrorInterceptorService', () => {
  let service: HttpClientErrorInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpClientErrorInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
