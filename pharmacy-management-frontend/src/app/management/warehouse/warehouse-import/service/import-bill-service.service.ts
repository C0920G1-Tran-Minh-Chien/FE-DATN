import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ImportBill} from '../model/import-bill';
import {IImportBillDto} from '../model/iimport-bill-dto';

const API_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class ImportBillServiceService {

  constructor(private http: HttpClient) {
  }

  deleteBill(id: number): Observable<ImportBill[]> {
    return this.http.delete<ImportBill[]>(API_URL + 'api/import-bills/' + id);
  }


  getAllBill(index: number): Observable<IImportBillDto[]> {
    return this.http.get<IImportBillDto[]>(API_URL + 'api/import-bills/list-bills?index=' + index);
  }

  getAllBillPaging(page: number): Observable<IImportBillDto[]> {
    return this.http.get<IImportBillDto[]>(API_URL + 'api/import-bills/list-bill-page?page=' + page);
  }

  getSearchSortPaging(codeBill: string, startDate: string, endDate: string, col: string, page: number): Observable<any> {
    return this.http.get<any>(API_URL + 'api/import-bills/search-sort-page?codeBill=' + codeBill + '&startDate=' + startDate + '&endDate=' + endDate + '&col=' + col +
      '&page=' + page);
  }

  getSearchSort(codeBill: string, startDate: string, endDate: string, sort: string, page: number): Observable<any> {
    return this.http.get<any>(API_URL + 'api/import-bills/search-sort-page-bill?codeBill=' + codeBill + '&startDate=' + startDate + '&endDate=' + endDate +
      '&sort'+sort+'&page=' + page);
  }
}
