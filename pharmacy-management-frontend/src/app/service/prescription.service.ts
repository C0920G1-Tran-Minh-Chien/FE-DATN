import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Prescription} from '../model/prescription';
import {Indicative} from '../model/indicative';
import {BillSale} from "../model/bill-sale";

const API_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(this.URL);
  }


  getAllPrescription(name: string, code: string, object: string, symptom: string, page: number, sortBy: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(API_URL + '/prescriptions/prescription-list' + '?prescriptionName=' + name + '&prescriptionCode=' + code + '&object=' + object + '&symptom=' + symptom + '&page=' + page + '&sortBy=' + sortBy);
  }

  savePrescription(prescription): Observable<Prescription> {
    return this.http.post<Prescription>(API_URL + '/prescriptions/prescription-create', prescription);
  }

  findById(id: number): Observable<Prescription> {
    return this.http.get<Prescription>(`${API_URL}/prescriptions/prescriptions/${id}`);
  }

  updatePrescription(id: number, prescription: Prescription): Observable<Prescription> {
    return this.http.put<Prescription>(`${API_URL}/prescriptions/prescription-edit/${id}`, prescription);
  }

  deletePrescription(id: number): Observable<Prescription> {
    return this.http.delete<Prescription>(`${API_URL}/prescriptions/prescription-delete/${id}`);
  }

  getIdicative(id: number): Observable<Indicative[]> {
    return this.http.get<Indicative[]>(`${API_URL}/indicatives/indicative-list/${id}`);
  }

  getPress(): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(API_URL + '/prescriptions/list');
  }

  // TAMNL

  private URL = 'http://localhost:8080/bill-sale/prescription';
  private URL1 = 'http://localhost:8080/bill-sale/drug-of-bill';



  findAll(id: number): Observable<any> {
    return this.http.get(`${this.URL1}/${id}`);
  }

  findPrescriptionById(id: number): Observable<any> {
    return  this.http.get(`${this.URL}/${id}`);
  }
  saveBIll(bill: BillSale): Observable<any> {
    return this.http.post(this.URL + '/bill', bill);
    console.log(bill);
  }

  search(fieldSearch: string, valueSearch: string): Observable<any> {
    return this.http.get(this.URL + '/search/?fieldSearch=' + fieldSearch + '&valueSearch=' + valueSearch);
  }

  save(drugOfBill1: Indicative): Observable<any> {
    return this.http.post(this.URL + '/save', drugOfBill1);
  }
  findNewBill(): Observable<any> {
    return this.http.get(this.URL + '/find-bill');
  }
}
