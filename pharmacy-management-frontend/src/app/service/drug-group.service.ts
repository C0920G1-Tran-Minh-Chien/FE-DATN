import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DrugGroupDto} from "../model/drug-group";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class DrugGroupService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<DrugGroupDto[]> {
    return this.http.get<DrugGroupDto[]>(`${API_URL}/drugGroup`);
  }

  getCode(): Observable<DrugGroupDto[]> {
    return this.http.get<DrugGroupDto[]>(`${API_URL}/drugGroup/code`);
  }
  getAllPage(num: number): Observable<DrugGroupDto[]> {
    return this.http.get<DrugGroupDto[]>(`${API_URL}/drugGroup/page`+'?page='+num);
  }
  save(drugGroup): Observable<DrugGroupDto> {
    return this.http.post<DrugGroupDto>(`${API_URL}/drugGroup/create`, drugGroup);
  }

  update(drugGroupId: number, drugGroup: DrugGroupDto): Observable<DrugGroupDto> {
    return this.http.put<DrugGroupDto>(`${API_URL}/drugGroup/edit/${drugGroupId}`, drugGroup);
  }

  delete(drugGroupId: number): Observable<DrugGroupDto> {
    // @ts-ignore
    return this.http.patch<DrugGroupDto>(`${API_URL}/drugGroup/delete/${drugGroupId}`);
  }

}
