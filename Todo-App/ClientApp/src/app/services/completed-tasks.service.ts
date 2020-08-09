import { Injectable, Inject } from '@angular/core';
import { Items } from '../models/items';
import { HttpClient, HttpHeaders, HttpHeaderResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class CompletedTasksService {

  baseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') _baseUrl: string) {
      this.baseUrl = _baseUrl;
  }

  getCompletedTasks(): Observable<Items[]> {
    return this.http.get<Items[]>(this.baseUrl + 'Items/GetCompletedTasksAsync');
  }

  deleteTask(item: Items): Observable<HttpResponse<Config>> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const options = { headers: httpHeaders };

    return this.http.post<HttpResponse<Config>>(this.baseUrl + 'Items/DeleteConfirmedAsync', item, options);
  }

  deleteAll(items: Items[]): Observable<HttpResponse<Config>> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const options = { headers: httpHeaders };

    return this.http.post<HttpResponse<Config>>(this.baseUrl + 'Items/DeleteAllAsync', items, options);
  }
}
