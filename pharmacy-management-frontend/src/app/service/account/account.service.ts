import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";





const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getAllAccount(page: number, size: number, keyWord: string, property: number, roleId: number): Observable<any> {
    const params = new HttpParams()
      .set('page', `${page}`)
      .set('size', `${size}`)
      .set('keyWord', keyWord)
      .set('property', `${property}`)
      .set('roleId', `${roleId}`);
    return this.http.get<any>(API_URL + '/users', {params});
  }

  findById(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/users/${id}`);
  }

  updateAccount(id: number, account: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/users/edit/${id}`, account);
  }

}
