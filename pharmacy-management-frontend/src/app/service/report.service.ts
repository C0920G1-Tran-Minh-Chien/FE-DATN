import {Injectable} from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


const API_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';

  constructor(private http: HttpClient) {
  }

  public exportExcel(jsonData: any[], fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    const wb: XLSX.WorkBook = {Sheets: {data: ws}, SheetNames: ['data']};
    const excelBuffer: any = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
// save
    const data: Blob = new Blob([excelBuffer], {type: this.fileType});
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + this.fileExtension);
  }

  importDetails(choice: string, startDate: string, endDate: string): Observable<[]> {
    return this.http.get<[]>(`${API_URL}/report/${choice}/${startDate}/${endDate}`);
  }

  showChart( startDate: string, endDate: string): Observable<[]> {
    return this.http.get<[]>(`${API_URL}/report/chart/${startDate}/${endDate}`);
  }
}
