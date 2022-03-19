import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Payment} from '../model/payment';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Payment[]> {
    return  this.http.get<Payment[]>(API_URL + '/payments');
  }
  create(value): Observable<Payment> {
    return  this.http.post<Payment>(API_URL + '/payments', value);
  }
  update(value, id) {
    return  this.http.put<Payment[]>(`${API_URL}/payments/${id}`, value);
  }
  remove(id) {
    return this.http.delete<Payment[]>(`${API_URL}/payments/${id}`);
  }
}
