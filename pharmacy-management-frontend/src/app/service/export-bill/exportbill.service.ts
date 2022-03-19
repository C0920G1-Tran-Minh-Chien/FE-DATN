import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ExportBill} from '../../model/export-bill/exportBill';
import {ExportBillDetails} from '../../model/export-bill/exportBillDetails';

@Injectable({
  providedIn: 'root'
})
export class ExportbillService {
  private API_EXPORT_BILL = "http://localhost:8080/api/export-bill";
  private API_EMPLOYEE = "http://localhost:8080/api";
  constructor(private http: HttpClient) { }

  createCodeExportBillRefund(): Observable<any> {
    return this.http.get(`${this.API_EXPORT_BILL}/createCode`);
  }
  createCodeExportBillDestroy(): Observable<any> {
    return this.http.get(`${this.API_EXPORT_BILL}/create-code-destroy`);
  }

  createExportBill(exportBill: ExportBill): Observable<any>{
    return this.http.post<any>(this.API_EXPORT_BILL,exportBill);
  }

  createExportBillDetail(exportBillDetail : ExportBillDetails): Observable<any>{
    return this.http.post<any>(this.API_EXPORT_BILL+ '/export-bill-detail',exportBillDetail);
  }

  getEmployee():Observable<any>{
    return this.http.get<String>(this.API_EMPLOYEE+ '/employees');
  }


  //LIST
  getAllCaseRecord(pageNumber: number): Observable<ExportBill[]> {
    return this.http.get<ExportBill[]>(this.API_EXPORT_BILL+'?page='+pageNumber);
  }

  getCaseRecordById(id: number): Observable<ExportBill> {
    return this.http.get<ExportBill>(this.API_EXPORT_BILL + '/find/' + id);
  }

  // tslint:disable-next-line:max-line-length
  getCaseRecordByFields(field1: string, field2: string, field3: string, field4: string, field5: string, pageNumber: number): Observable<ExportBill[]> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<ExportBill[]>(this.API_EXPORT_BILL + '/find/' + field1 + '/' + field2 + '/' + field3 + '/' + field4 + '/' + field5 +'?page='+pageNumber );
  }

  delete(id: number): Observable<ExportBill> {
    return this.http.delete(this.API_EXPORT_BILL + '/delete/' + id );
  }


}
