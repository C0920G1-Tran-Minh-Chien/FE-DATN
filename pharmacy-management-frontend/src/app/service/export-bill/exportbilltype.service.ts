import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExportbilltypeService {
  private API_EXPORTBILLTYPE = "http://localhost:8080/api/export-bill-type";
  constructor(private http: HttpClient) { }

  // @ts-ignore
  getAllExportBillType() : Observable<any> {
    return this.http.get(this.API_EXPORTBILLTYPE);
  }
}
