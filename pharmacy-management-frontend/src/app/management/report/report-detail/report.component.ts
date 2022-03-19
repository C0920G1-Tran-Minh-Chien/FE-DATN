import {Component, OnInit} from '@angular/core';
import {ReportService} from '../../../service/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  choice = '';
  sDate = '';
  eDate = '';
  sTime = '00:00';
  eTime = '23:59';
  msgChoice: string;
  msgDate: string;
  displayDate = true;

  constructor(private sv: ReportService) {

  }

  ngOnInit(): void {
  }


  showDate() {
    this.displayDate = true;
  }

  hiddenDate() {
    this.displayDate = false;
  }

  exportExcelHaveDate() {
    if ((this.sDate === '' || this.eDate === '' || this.sTime === '' || this.eTime === '') && this.displayDate) {
      this.msgDate = 'Vui lòng chọn ngày.';
      return;
    }
    if (((Date.parse(this.sDate) - Date.parse(this.eDate) > 43100000))) {
      this.msgDate = 'Vui lòng chọn ngày bắt đầu trước ngày kết thúc.';
      return;
    }
    if (this.choice === '') {
      this.msgDate = '';
      this.msgChoice = 'Vui lòng chọn loại báo cáo.';
      return;
    }
    const startDate = this.sDate + 'T' + this.sTime;
    const endDate = this.eDate + 'T' + this.eTime;
    this.sv.importDetails(this.choice, startDate, endDate).subscribe(r => {
      if (r.length < 1) {
        this.msgDate = '';
        this.msgChoice = 'Không tìm thấy kết quả.';
        return;
      }
      this.sv.exportExcel(r, this.choice);
      this.msgDate = '';
      this.msgChoice = '';
    }, e => {
      console.log('error');
      this.msgDate = '';
      this.msgChoice = 'Không tìm thấy kết quả.';
    });
  }


  subDate(dateTime: string) {
    const v = dateTime.substr(0, 10);
    console.log(v);
    return v;
  }

  subTime(dateTime: string) {
    const v = dateTime.substr(11, 16);
    console.log(v);
    return v;
  }
}
