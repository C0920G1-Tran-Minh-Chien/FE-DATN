import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Indicative} from '../model/indicative';

const API_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class IndicativeService {

  constructor(private http: HttpClient) {
  }

  getAllIndicative() {
    return this.http.get<Indicative[]>(API_URL + '/indicatives/indicative-list');
  }


  saveIndicative(indicative): Observable<Indicative> {
    return this.http.post<Indicative>(API_URL + '/indicatives', indicative);
  }
  deleteIndicative(id: number): Observable<Indicative> {
    return this.http.delete<Indicative>(`${API_URL}/indicatives/${id}`);
  }

}
