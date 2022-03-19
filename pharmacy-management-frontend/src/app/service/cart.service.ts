import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DrugCartBackend} from "../model/cart/drug-cart-backend";
import {Voucher} from "../model/cart/voucher";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  API_URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=9dae1030427407802f422bf0524ac146';
  // API_URL = '';
  API_EMAIL = 'http://localhost:8080/email/send';
  API_BACKEND = 'http://localhost:8080/drug-client/cart';
  API_VOUCHER = 'http://localhost:8080/cart/voucher';
  constructor(private http: HttpClient) {
  }

  convertUsdCurrency(): Observable<any> {
    return this.http.get<any>(this.API_URL);
  }

  findAllVoucher(): Observable<Voucher[]> {
    return  this.http.get<Voucher[]>(this.API_VOUCHER);
  }
  removeVoucher(listId: string){
    return this.http.get(`${this.API_VOUCHER}/delete/${listId}`)
  }

  sendEmail(name: string, email: string, listDrug: string){
    console.log(name)
    console.log(email)
    console.log(listDrug)
    return  this.http.get(`${this.API_EMAIL}/${name}/${email}/${listDrug}` );
  }

  findDrugCartById(id: number): Observable<DrugCartBackend> {
    return this.http.get<DrugCartBackend>(`${this.API_BACKEND}/${id}`)
  }
}
