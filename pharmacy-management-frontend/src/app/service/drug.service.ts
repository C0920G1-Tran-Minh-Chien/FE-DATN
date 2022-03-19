import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Drug} from '../model/drug';
import {DrugOfBill} from "../model/drug-of-bill";

@Injectable({
  providedIn: 'root'
})
export class DrugService {
  private URl = 'http://localhost:8080/api/drugs';

  constructor(private http: HttpClient) { }

  getDrugGroupById(id: number): Observable<any> {
    return this.http.get(`${this.URl}/drugGroupId/${id}`);
  }

  getAllDrugsSearch(field: string, sign: string, input: string, index: number): Observable<any> {
    return this.http.get(this.URl + '/search?field=' + field + '&sign=' + sign + '&input=' + input + '&index=' + index);
  }
  getAllDrugsSearchNotPagination(field: string, sign: string, input: string): Observable<any> {
    return this.http.get(this.URl + '/search-not-pagination?field=' + field + '&sign=' + sign + '&input=' + input);
  }
  getAllPagination(index: number, drugName, drugGroup, activeElement): Observable<any> {
    return this.http.get(this.URl + '?index=' + index + "&nameDrug=" + drugName + "&drugGroup="+drugGroup+"&activeElement="+activeElement);
  }

  getAll(drugName, drugGroup, activeElement): Observable<any> {
    return this.http.get(this.URl + '/not-pagination?nameDrug=' + drugName + "&drugGroup="+drugGroup+"&activeElement="+activeElement );
  }
  getAllCTM(): Observable<any> {
    return this.http.get(this.URl);
  }
  getAllNormal(): Observable<any> {
    return this.http.get(this.URl + '/get-normal');

  }
  deleteDrug(id: number): Observable<any> {
    return this.http.delete(`${this.URl}/delete/${id}`);
  }
  getDrugById(id: number): Observable<any> {
    return this.http.get(`${this.URl}/${id}`);
  }


  save(drug: Drug): Observable<any> {
    return this.http.post<any>(this.URl, drug);
  }
  saveImage(drugImage: any): Observable<any> {
    return this.http.post<any>(this.URl + '/image', drugImage);
  }
  update(id: number, code: number, drug: Drug): Observable<any> {
    return this.http.put<any>(`${this.URl}/${id}&${code}`, drug);
  }
  getById(id): Observable<any> {
    return this.http.get(`${this.URl}/${id}`);
  }

  // fixbug

  getAllDrugPrice(): Observable<any> {
    return this.http.get(this.URl + '/get-price-drug');
  }
  getAllDrugOfListPrice(id : any): Observable<DrugOfBill[]> {
    return this.http.get<DrugOfBill[]>(`${this.URl}/list-drug-price/${id}`);
  }

  getDrugPriceById(id: any): Observable<any> {
    return this.http.get(`${this.URl}/drug-id-price/${id}`);
  }
}
