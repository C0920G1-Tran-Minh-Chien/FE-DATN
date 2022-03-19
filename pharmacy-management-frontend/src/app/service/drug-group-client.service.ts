import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrugGroupClientService {
  private URl = 'http://localhost:8080/drug-group';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.URl);
  }
}
