import { Injectable, Inject } from '@angular/core';
import { Items } from '../models/items';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ActiveTasksService {

  baseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') _baseUrl: string) {
      this.baseUrl = _baseUrl;
  }

  getActiveTasks(): Observable<Items[]> {
    return this.http.get<Items[]>(this.baseUrl + 'Items/GetActiveTasksAsync');
  }

  createNewTask(item: Items): Observable<Items> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const options = { headers: httpHeaders };

    return this.http.post<Items>(this.baseUrl + 'Items/CreateAsync', item, options);
  }

  completeTask(item: Items): Observable<{}> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const options = { headers: httpHeaders };

    return this.http.post(this.baseUrl + 'Items/EditAsync', item, options);
  }
}
