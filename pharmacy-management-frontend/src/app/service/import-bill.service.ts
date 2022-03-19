import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {ImportBill} from '../model/import-bill';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class ImportBillService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<ImportBill[]> {
    return  this.http.get<ImportBill[]>(API_URL + '/import-bills');
  }
  create(value): Observable<ImportBill> {
    return  this.http.post<ImportBill>(API_URL + '/import-bills', value);
  }
  update(value, id) {
    return  this.http.put<ImportBill[]>(`${API_URL}/import-bills/${id}`, value);
  }
  remove(id) {
    return this.http.delete<ImportBill[]>(`${API_URL}/import-bills/${id}`);
  }
}
