import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DrugCartBackend} from "../model/cart/drug-cart-backend";

@Injectable({
  providedIn: 'root'
})
export class DrugClientService {
  private URl = 'http://localhost:8080/drug-client';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${this.URl}/list`);
  }

  searchDrug(search: any): Observable<any> {
    return this.http.get(`${this.URl}/search-drug/${search}`);
  }

  findDrugByGroup(drugGroupName: any): Observable<any> {
    return this.http.get(`${this.URl}/drug-group/${drugGroupName}`);
  }

  findDrugById(drugId: any): Observable<any> {
    return this.http.get(`${this.URl}/client/${drugId}`);
  }

  findDrugCartById(drugId: number): Observable<DrugCartBackend>{
    return this.http.get<DrugCartBackend>(`${this.URl}/cart/${drugId}`)
  }
}
