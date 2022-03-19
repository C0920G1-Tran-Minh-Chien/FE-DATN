import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CustomerGroupLookup} from '../model/lookup/customer-group-lookup';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  private URl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  getCustomersByKeyWord(attribute: string, keyWord: string, page: number): Observable<any> {
    return this.http.get(this.URl + '/customer/search' + '?attribute=' + attribute + '&keyWord1=' + keyWord + '&page=' + page );
  }

  getCustomerGroups(): Observable<CustomerGroupLookup[]>{
    return this.http.get<CustomerGroupLookup[]>(this.URl + '/customer_group');
  }

  getManufacturerByKeyWord(attribute: string, keyWord: string, page: number): Observable<any> {
    return this.http.get(this.URl + '/manufacturer/search' + '?attribute=' + attribute + '&keyWord1=' + keyWord + '&page=' + page);
  }
}
