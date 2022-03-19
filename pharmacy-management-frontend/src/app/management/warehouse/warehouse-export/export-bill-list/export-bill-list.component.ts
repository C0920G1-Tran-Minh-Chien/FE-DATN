import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

import {Observable} from 'rxjs';
import {ExportBillDeleteComponent} from '../export-bill-delete/export-bill-delete.component';
import {MatDialog} from '@angular/material/dialog';
import {ExportbillService} from '../../../../service/export-bill/exportbill.service';
import {ExportBillDetails} from '../../../../model/export-bill/exportBillDetails';
import {ExportBillPrintComponent} from "../export-bill-print/export-bill-print.component";
import {ExportBill} from "../../../../model/export-bill/exportBill";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {DialogService} from "../../../../service/export-bill/dialog.service";
import DateTimeFormat = Intl.DateTimeFormat;

@Component({
  selector: 'app-export-bill-list',
  templateUrl: './export-bill-list.component.html',
  styleUrls: ['./export-bill-list.component.css']
})
export class ExportBillListComponent implements OnInit {

  exportBillList: ExportBill[] = [];
  selectRecord: number[] = [];
  // tslint:disable-next-line:ban-types
  data: Object;
  page: number;
  max: any;
  pages: Array<number>;
  totalMoney = 0;
  message1: string;
  message2: string;
  message3: string;
  message4: string;

  constructor(private exportBillService: ExportbillService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private dialogService: DialogService,
              private _location: Location) { }

  ngOnInit(): void {
    this.getAllRecord();
  }

  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  };

  success(msg) {
    this.config['panelClass'] = ['notification', 'success'];
    this.snackBar.open(msg, '', this.config);
  }

  warn(msg) {
    this.config['panelClass'] = ['notification', 'warn'];
    this.snackBar.open(msg, '', this.config);
  }

  selectRecords(id: number) {
    if (this.selectRecord.length == 0){
      this.selectRecord.push(id);
    } else {
      this.selectRecord.pop();
      this.selectRecord.push(id);
    }
    console.log(this.selectRecord);
  }

  getAllRecord() {
    this.exportBillService.getAllCaseRecord(this.page).subscribe(exportBills => {
      this.data = Object.values(exportBills);
      console.log(this.data);
      this.exportBillList = this.data[0];
      this.pages = new Array<any>(exportBills['totalPages']);
    });
  }

  getCaseRecordByFields(field1: string, field2: string, field3: string, field4: string, field5: string, page: number) {
    console.log(field1 + field2 + field3 + field4 + field5)
    if (field1 == null ||  field2 == null || field3 == null || field4 == null || field5 == null) {
      if (field1 == null){
        this.message1 = "ngày không được để trống";
      } else {
        this.message1 = null;
      }
      if (field2 == null){
        this.message2 = "ngày không được để trống";
      } else {
        this.message2 = null;
      }
      if (field3 == null){
        this.message3 = "giờ không được để trống";
      } else {
        this.message3 = null;
      }
      if (field4 == null){
        this.message4 = "giờ không được để trống";
      } else {
        this.message4 = null;
      }
    } else {
      if (Date.parse(field1) > Date.parse(field2)) {
        this.message1 = this.message2 = "Nhập ngày ở ô Từ ngày nhỏ hơn ở ô Đến ngày";
      }
      // } else if ( > Date.parse(field4)) {
      //   this.message3 = this.message4 = "Nhập ngày ở ô Từ giờ nhỏ hơn ở ô Đến giờ";
      // }
        else {
        this.message1 = this.message2 = this.message3 = this.message4 = "";
        this.exportBillService.getCaseRecordByFields(field1, field2, field3, field4, field5, this.page).subscribe(exportBills => {
          this.data = Object.values(exportBills);
          console.log(this.data);
          this.exportBillList = this.data[0];
          this.pages = new Array<any>(exportBills['totalPages']);
          if (this.exportBillList.length == 0){
            this.warn("Nhập đúng kiểu '2021/01/01' và '00:00'");
          }
        });
      }
    }
  }

  openDialogDelete(): void {
    const id: number = this.selectRecord[0];
    const check: boolean = false;
    const dialogRef = this.dialog.open( ExportBillDeleteComponent , {
        data: {id, check}
      }
    );
    dialogRef.afterClosed().subscribe(() => {
      this.getAllRecord();
    });
  }

  openDialogPrint(): void {
    const id: number = this.selectRecord[0];
    const dialogRef = this.dialog.open( ExportBillPrintComponent , {
      data: {id}
      }
    );
    dialogRef.afterClosed().subscribe(() => {
      this.getAllRecord();
    });
  }

  previous() {

    if (this.page <= 0) {
      alert('không tìm thấy trang');
    } else {
      this.page = this.page - 1;
      this.getAllRecord();
    }
  }

  next() {

    this.max = this.pages.length;
    if (this.page + 2 > this.max) {
      alert('không tìm thấy trang');
    } else {
      this.page = this.page + 1;
      this.getAllRecord();
    }
  }


  setPage(i: number) {
    this.page = i;
    this.getAllRecord();
  }

  setTotal(exportBillDetail: ExportBillDetails): number {
    if (exportBillDetail.exportBill.exportBillType.exportBillTypeId == 1){
      return (exportBillDetail.importBillDrug.importAmount * exportBillDetail.importBillDrug.importPrice) - (exportBillDetail.importBillDrug.discountRate * exportBillDetail.importBillDrug.importPrice / 100) - (exportBillDetail.importBillDrug.importAmount * exportBillDetail.importBillDrug.importPrice * exportBillDetail.importBillDrug.vat / 100);
    }
    return (exportBillDetail.importBillDrug.importAmount * exportBillDetail.importBillDrug.importPrice) - (exportBillDetail.importBillDrug.discountRate * exportBillDetail.importBillDrug.importPrice / 100);
  }

  getBackLastPage() {
    this.dialogService.openConfirm('Bạn có muốn trở lại hay không ?')
      .afterClosed().subscribe(res => {
      if (res == true) {
        this.backToLastPage();
      }
    });
  }

  backToLastPage() {
    this._location.back();
  }

}
