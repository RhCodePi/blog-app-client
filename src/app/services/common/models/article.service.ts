import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom } from 'rxjs';
import { Article } from '../../../contracts/articles/article';
import { HttpHeaders } from '@angular/common/http';
import { StorageService } from '../storage.service';


const REFRESH_TOKEN: string = 'refresh_token'

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(
    private httpClient: HttpClientService,
    private storageService: StorageService
  ) {}
  async getUserArticles(): Promise<Article[]> {
    const headers = this.addAuthToHeaders();

    const observable = this.httpClient.post<Article[] | any>(
      {
        controller: 'articles',
        action: 'getuserarticles',
        headers: headers,
      },
      {
        refreshToken: this.storageService.getLocalStorage(REFRESH_TOKEN),
      }
    );

    return (await firstValueFrom(observable)) as Article[];
  }

  async createArticle(title: string, content: string): Promise<boolean> {

    var observable = this.httpClient.post<boolean|any>({
      controller:"articles",
      action:"createarticle",
      headers: this.addAuthToHeaders()
    }, {
      title,
      content,
      refreshToken: this.storageService.getLocalStorage(REFRESH_TOKEN)
    });
    
    return await firstValueFrom(observable) as boolean
  }

  private addAuthToHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.storageService.getLocalStorage(
        'access_token'
      )}`,
    });
  }
}
