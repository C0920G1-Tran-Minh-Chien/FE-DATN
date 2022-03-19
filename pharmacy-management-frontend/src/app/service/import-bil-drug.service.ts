import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ImportBillDrug} from '../model/import-bill-drug';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class ImportBilDrugService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<ImportBillDrug[]> {
    return  this.http.get<ImportBillDrug[]>(API_URL + '/importBillDrugs');
  }
  create(value): Observable<ImportBillDrug> {
    return  this.http.post<ImportBillDrug>(API_URL + '/importBillDrugs', value);
  }
  update(value, id) {
    return  this.http.put<ImportBillDrug[]>(`${API_URL}/importBillDrugs/${id}`, value);
  }
  remove(id) {
    return this.http.delete<ImportBillDrug[]>(`${API_URL}/importBillDrugs/${id}`);
  }
}
