import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Drug} from '../model/drug';
import {Employee} from '../model/employee';
import {Customer} from '../model/customer';
import {BillSale} from '../model/bill-sale';
import {DrugOfBill} from '../model/drug-of-bill';


@Injectable({
  providedIn: 'root'
})
export class BillSaleService {
  private API_URL = 'http://localhost:8080/bill-sale';

  constructor(private http: HttpClient) {
  }

  getListDrug(): Observable<Drug[]> {
    return this.http.get<Drug[]>(this.API_URL + '/get-list-drug');
  }

  getListEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.API_URL + '/get-list-employee');
  }

  getListCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.API_URL + '/get-list-customer');
  }

  getBillSaleById(id: number): Observable<BillSale> {
    return this.http.get<BillSale>(this.API_URL + '/get-bill-sale?id=' + id);
  }

  getDrugOfBillByBillSaleId(id: number): Observable<DrugOfBill[]> {
    return this.http.get<DrugOfBill[]>(this.API_URL + '/get-list-drug-of-bill?id=' + id);
  }

  createBillSale(billSale: BillSale): Observable<BillSale> {
    return this.http.post<BillSale>(this.API_URL + '/create-bill-sale', billSale);
  }

  updateBillSale(billSale: BillSale): Observable<BillSale> {
    return this.http.post<BillSale>(this.API_URL + '/create-bill-sale', billSale);
  }

  createDrugOfBill(drugOfBill: DrugOfBill): Observable<DrugOfBill> {
    return this.http.post<DrugOfBill>(this.API_URL + '/create-drug-of-bill', drugOfBill);
  }

  updateDrug(drug: Drug): Observable<Drug> {
    return this.http.put<Drug>(this.API_URL + '/update-drug', drug);
  }

  findBillSaleLast(): Observable<Drug> {
    return this.http.get<Drug>(this.API_URL + '/prescription/find-bill');
  }

  findDrugById(id: number): Observable<Drug> {
    return this.http.get<Drug>(this.API_URL + '/find-drug-by-id?id=' + id);
  }


  //HieuNV

  private api_url = 'http://localhost:8080/api/bill';
  private api_url2 = 'http://localhost:8080/api/bill/search';


  getAll(page: number): Observable<BillSale[]> {
    return this.http.get<BillSale[]>(this.api_url + '?page=' + page );
  }
  findById(id: number): Observable<BillSale> {
    return this.http.get<BillSale>(`${this.api_url}/${id}`);
  }
  deleteBillSale(id: number, billSale: BillSale ): Observable<BillSale> {
    return this.http.patch<BillSale>(`${this.api_url}/${id}`, billSale);
  }


// tslint:disable-next-line:max-line-length
  searchBillSale(search1: string, search2: string, search3: string, search4: string, search5: string, search6: string, page: number): Observable<BillSale[]> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<BillSale[]>(this.api_url2 + '?search1=' + search1 + '&search2=' + search2 + '&search3=' + search3 + '&search4=' + search4 + '&search5=' + search5 + '&search6=' + search6 +'&page=' + page );
  }

}
