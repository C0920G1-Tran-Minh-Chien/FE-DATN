import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImportbilldrugService {
  private API_IMPORTBILLDRUG = "http://localhost:8080/api/importBillDrug";
  constructor(private http: HttpClient) { }

  // @ts-ignore
  getAllImportBillDrug(): Observable<any> {
    return this.http.get(this.API_IMPORTBILLDRUG);
  }

  // @ts-ignore
  getDrugById(id: number): Observable<any> {
    return this.http.get(`${this.API_IMPORTBILLDRUG}/${id}`)
  }

  // @ts-ignore
  getByManufacturerId(id: number): Observable<any> {
    return this.http.get(`${this.API_IMPORTBILLDRUG}/manufacturer/${id}`)
  }

  getEmployee():Observable<any>{
    return this.http.get<String>('http://localhost:8080/api/employees');
  }
}
