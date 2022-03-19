
import {Component, OnInit} from '@angular/core';
import {ImportBill} from '../model/import-bill';
import {ImportBillServiceService} from '../service/import-bill-service.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {WarehouseImportDerugDeleteComponent} from '../warehouse-import-derug-delete/warehouse-import-derug-delete.component';
import {IImportBillDto} from '../model/iimport-bill-dto';
import {Router} from '@angular/router';
import {DialogService} from "../../../../service/export-bill/dialog.service";
import {ToastrService} from "ngx-toastr";



@Component({
  selector: 'app-warehouse-import-drug-list',
  templateUrl: './warehouse-import-drug-list.component.html',
  styleUrls: ['./warehouse-import-drug-list.component.css']
})
export class WarehouseImportDrugListComponent implements OnInit {

  flag = false;
  bills: IImportBillDto[] = [];
  page: number = 0;
  pages: Array<number>;
  totalPage = 0;
  invoiceDate = 'invoiceDate';
  desc = 'desc';
  message = '';
  startDateTime = '';
  endDateTime = '';
  startDate = '1000-01-01 ';
  endDate = '9999-09-09 ';
  startTime = '';
  endTime = '';
  newDate = new Date();
  nowDate = this.newDate.getFullYear().toString() + '-' + (this.newDate.getMonth() + 2).toString() + '-' + this.newDate.getDate().toString();
  nowTime = this.newDate.getHours().toString() + ':' + this.newDate.getMinutes().toString() + ':' + this.newDate.getMilliseconds().toString();
  public searchBill: FormGroup;
  idDialog: any;
  nameDialog: any;
  selectedImportbill: ImportBill;
  validate_message = {
    date: [
      {type: 'pattern', message: '* ex:dd-mm-yyyy'}
    ], time: [
      {type: 'pattern', message: '* ex:hh:mm'}
    ],

  };

  constructor(private importBillServiceService: ImportBillServiceService,
              private dialog: MatDialog,
              private router: Router,
              private dialogService : DialogService,
              private toastr : ToastrService) {
  }

  ngOnInit(): void {
    this.getListBill(this.page);

    this.searchBill = new FormGroup({
      billCode: new FormControl(''),
      startDate: new FormControl('', [Validators.pattern('^\\d{4}\\-\\d{2}\\-\\d{2}$')]),
      endDate: new FormControl('', [Validators.pattern('^\\d{4}\\-\\d{2}\\-\\d{2}$')]),
      sortOrder: new FormControl(''),
    },this.validDate);
  }

  firstPage(page) {
    if (this.flag) {
      this.search(page);
    } else {
      this.getListBill(page);
    }
  }

  lastPage(page) {
    if (this.flag) {
      this.search(page);
    } else {
      this.getListBill(page);
    }
  }

  choosePage(page) {
    if (this.flag) {
      this.search(page);
    } else {
      this.getListBill(page);
    }
  }

  openDialogDelete(): void {
    const id = this.idDialog;
    const name = this.nameDialog;
    let dialogRef = this.dialog.open(WarehouseImportDerugDeleteComponent, {
      width: '500px',height: '300px',
        data: {id, name}
      }
    );
    dialogRef.afterClosed().subscribe(() => {

      this.ngOnInit();
    });
  }


  subDate(dateTime: string) {
    const v = dateTime.substr(0, 10);
    return v;
  }

  subTime(dateTime: string) {
    const v = dateTime.substr(11, 16);
    return v;
  }


  nextPage() {
    if (this.page < this.pages.length - 1) {
      this.page = this.page + 1;
      if (this.flag) {
        this.search(this.page);
      } else {
        this.getListBill(this.page);
      }
    }
  }

  previousPage() {
    if (this.page > 0) {
      this.page = this.page - 1;
      this.search(this.page);
    }
  }

  search(page) {
    // Date
    this.flag = true;
    if (this.searchBill.value.startDate == '' && this.searchBill.value.endDate == '') {
      this.searchBill.value.startDate = '1000-01-01';
      this.searchBill.value.endDate = this.nowDate;
    } else if (this.searchBill.value.endDate == '') {
      this.searchBill.value.endDate = this.nowDate;
    } else if (this.searchBill.value.startDate == '') {
      this.searchBill.value.startDate = this.startDate;
    }
    // if sort trong
    if (this.searchBill.value.sortBill == '') {
      this.searchBill.value.sortBill = this.invoiceDate;
    }
    if (this.searchBill.value.sortOrder == '') {
      this.searchBill.value.sortOrder ='desc';
    }
    this.startDateTime = this.searchBill.value.startDate + ' ' + this.searchBill.value.startTime;
    this.endDateTime = this.searchBill.value.endDate + ' ' + this.searchBill.value.endTime;
    this.importBillServiceService.getSearchSort(this.searchBill.value.billCode, this.startDateTime, this.endDateTime, this.searchBill.value.sortOrder, page).subscribe((data: IImportBillDto[]) => {
      if (data == null) {
        this.message = 'Thông tin bạn tìm kiếm hiện không có trong hệ thống ';
        alert(this.message);
      } else {
        data['content'].forEach(b => {
          b.date = this.subDate(b.invoiceDate);
          b.time = this.subTime(b.invoiceDate);
        });
        this.bills = data['content'];
        this.pages = new Array(data['totalPages']);
        this.totalPage = this.pages.length - 1;
      }
    });
  }

  getId(id: any, name: any) {
    this.idDialog = id;
    this.nameDialog = name;
  }

  changColor(importBill: ImportBill) {
    this.selectedImportbill = importBill;
  }

  getListBill(pageable) {
    this.page = pageable;
    this.importBillServiceService.getAllBillPaging(pageable).subscribe(data => {
      data['content'].forEach(b => {
        b.date = this.subDate(b.invoiceDate);
        b.time = this.subTime(b.invoiceDate);
      });
      this.bills = data['content'];
      this.pages = new Array(data['totalPages']);
      this.totalPage = this.pages.length - 1;
    }, error => console.log(error));
  }

  addNewImportBill() {
    this.router.navigate(['warehouse/import/add']);
  }
  validDate(control: AbstractControl) {
    const v = control.value;
    const start = new Date(v.startDate);
    const end = new Date(v.endDate);
    if (end.getTime() - start.getTime() < 0) {
      return {'validDate': true};
    }
    if (Date.now() - start.getTime() < 0) {
      return {'validDateStartNow': true};
    }
    if (Date.now() - end.getTime() < 0) {
      return {'validDateEndNow': true};
    }
    return null;
  }
}

