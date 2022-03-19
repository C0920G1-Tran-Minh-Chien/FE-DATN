import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Manufacturer} from "../model/manufacturer";
import {environment} from "../../environments/environment";
import {Observable} from 'rxjs';
import {ImportBill} from "../model/import-bill";
const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})

export class ManufacturerService {


  constructor(private http:HttpClient) { }
  getAll(page: number, search:any, selects:any, sort: any) {

      if(selects=="name"){
        return this.http.get<Manufacturer[]>(API_URL +'/manufacturer/list?page='+page+'&name='+search+'&sort='+sort);
      }else if(selects=="address"){
        return this.http.get<Manufacturer[]>(API_URL +'/manufacturer/list?page='+page+'&address='+search+'&sort='+sort);
      }else if(selects=="phoneNumber"){
        return this.http.get<Manufacturer[]>(API_URL +'/manufacturer/list?page='+page+'&phoneNumber='+search+'&sort='+sort);
      }else if(selects=="note"){
        return this.http.get<Manufacturer[]>(API_URL +'/manufacturer/list?page='+page+'&note='+search+'&sort='+sort);
      }else if(selects=="code"){
        return this.http.get<Manufacturer[]>(API_URL +'/manufacturer/list?page='+page+'&code='+search+'&sort='+sort);
      }
      if(sort!=null){
        switch (sort) {
          case "name": {
            return this.http.get<Manufacturer[]>(API_URL +'/manufacturer/list?page='+page+'&sort=name');
            break;
          }
          case "address": {
            return this.http.get<Manufacturer[]>(API_URL +'/manufacturer/list?page='+page+'&sort=address');
            break;
          }
          case "note": {
            return this.http.get<Manufacturer[]>(API_URL +'/manufacturer/list?page='+page+'&sort=note');
            break;
          }
          case "code": {
            return this.http.get<Manufacturer[]>(API_URL +'/manufacturer/list?page='+page+'&sort=code');
            break;
          }
          case "phoneNumber": {
            return this.http.get<Manufacturer[]>(API_URL +'/manufacturer/list?page='+page+'&sort=phoneNumber');
            break;
          }
          default: {
            return this.http.get<Manufacturer[]>(API_URL +'/manufacturer/list?page='+page);
          }
        }
      }

      else {
        return this.http.get<Manufacturer[]>(API_URL +'/manufacturer/list?page='+page);
      }
  }
  updateManufacturer(id:number, manufacturer: Manufacturer):Observable<Manufacturer>{
    console.log('abv');
    console.log(manufacturer);
    return  this.http.put<Manufacturer>(API_URL +'/manufacturer/update?id='+id,manufacturer);

  }
  saveManufacturer(manufacturer: Manufacturer):Observable<Manufacturer>{
    return this.http.post<Manufacturer>(API_URL +'/manufacturer/create', manufacturer)
  }
  findByIdManufacture(id: number){
    return this.http.get<Object>(API_URL +'/manufacturer/show?id='+id)
  }
  findImportBillByIdManufacturer(id:number, startDate: string,endDate:string, page:number){
      return this.http.get<ImportBill[]>(API_URL + '/manufacturer/importBill/shows?id='+id+'&startDate='+startDate+'&endDate='+endDate+'&page='+page);
  }
  findByIdImportBill(id: number){
    return this.http.get<ImportBill>(API_URL + '/manufacturer/importBill?id='+id);
  }
  deleteManufacturer(id:number, manufacturer: Manufacturer):Observable<Manufacturer> {
    console.log('abv');
    console.log(manufacturer);
    return this.http.put<Manufacturer>(API_URL + '/manufacturer/delete?id=' + id, manufacturer);
  }
  findAllNormal(){
    return this.http.get<Manufacturer[]>(API_URL + '/manufacturer/getAll');
  }
}

