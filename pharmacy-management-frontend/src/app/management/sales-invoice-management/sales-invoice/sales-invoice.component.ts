import {Component, OnInit} from '@angular/core';
import {BillSale} from "../../../model/bill-sale";
import {BillSaleService} from "../../../service/bill-sale.service";
import {MatDialog} from "@angular/material/dialog";
import {SalesInvoiceDeleteComponent} from "../sales-invoice-delete/sales-invoice-delete.component";
import {SalesInvoiceDetailComponent} from "../sales-invoice-detail/sales-invoice-detail.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ToastrModule, ToastrService} from "ngx-toastr";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {DatePipe} from "@angular/common";
import {FontBase64} from "../../../font-base64";
import {DialogService} from "../../../service/export-bill/dialog.service";


@Component({
  selector: 'app-sales-invoice',
  templateUrl: './sales-invoice.component.html',
  styleUrls: ['./sales-invoice.component.css']
})

export class SalesInvoiceComponent implements OnInit {
  billSales: BillSale[] ;
  idBillsales: number;
  selectedBillSale: BillSale;
  billSale1: BillSale;
  search1: string;
  search2: string;
  search3: string;
  search4: string;
  search5 = '';
  search6 = '';
  err = true;
  pages: Array<any>;
  page = 0;

  public searchForm: FormGroup = new FormGroup({
    search1: new FormControl('', [Validators.required, Validators.pattern(/^(19|20)?[0-9]{2}[- /.](0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])$/)]),
    search2: new FormControl('', [Validators.required, Validators.pattern(/^(19|20)?[0-9]{2}[- /.](0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])$/)]),
    search3: new FormControl('', [Validators.required, Validators.pattern(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)]),
    search4: new FormControl('', [Validators.required, Validators.pattern(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)]),
    search5: new FormControl(''),
    search6: new FormControl('')
  });

  constructor(private billSaleService: BillSaleService, public dialog: MatDialog,
              private snackBar: MatSnackBar,private toastr : ToastrService,
              private datePipe: DatePipe,private fontBase: FontBase64,
              private dialogService : DialogService) {
    this.getAll();
  }

  ngOnInit(): void {

  }

  getAll() {
    this.billSaleService.getAll(this.page).subscribe(next => {
      this.billSales = next['content'];
      this.pages = new Array<any>(next['totalPages']);
      this.billSales.forEach(d => {
        d.date = this.subDate(d.invoiceDate);
        d.time = this.subTime(d.invoiceDate);
      });
    });
    console.log(this.billSales)
  }

  subDate(dateTime: string) {
    const v = dateTime.substr(0, 10);
    return v;
  }

  subTime(dateTime: string) {
    const v = dateTime.substr(11, 16);
    return v;
  }


  changColorandId(billSaleId: number) {
    this.err = !this.err;
    if (this.err === false) {
      this.idBillsales = billSaleId;
      this.billSaleService.findById(this.idBillsales).subscribe(next => {
        this.billSale1 = next;
      });
    } else {
      this.idBillsales = null;
    }

  }

  changColor(billSale: BillSale) {
    this.selectedBillSale = billSale;
  }

  onDeleteHandler() {
    if (this.idBillsales == null) {
     this.toastr.error("Không tìm thấy hóa đơn!!!")
    } else {
      this.billSaleService.findById(this.idBillsales).subscribe(next => {
        this.billSale1 = next;
      });
     this.dialogService.openConfirm(this.billSale1.billSaleCode +""+ this.billSale1.billSaleId)
       .afterClosed().subscribe(result => {
       if (result) {
         this.billSaleService.deleteBillSale(this.idBillsales, this.billSale1).subscribe(next => {
           this.toastr.success('Xóa thành công', '' , {
             timeOut : 2000,
             progressBar: false
           });
           this.getAll();
         });
       }
     });
    }

  }

  search() {
    console.log(this.search1);
    console.log(this.search2);
    console.log(this.search3);
    console.log(this.search4);
    console.log(this.search5);
    console.log(this.search6);
    // tslint:disable-next-line:max-line-length

    this.billSaleService.searchBillSale(this.search1, this.search2, this.search3, this.search4, this.search5, this.search6, this.page).subscribe(next => {
      this.billSales = next['content'];
      if (this.billSales.length === 0) {
        this.toastr.error('Không tìm thấy hóa đơn', '' , {
          timeOut : 2000,
          progressBar: false
        });
      }
      this.pages = new Array<any>(next['totalPages']);
      console.log(this.pages);
      next['content'].forEach(d => {
        d.date = this.subDate(d.invoiceDate);
        d.time = this.subTime(d.invoiceDate);
      });
    });

  }


  setPage(i: number) {
    this.page = i;
    this.getAll();

  }

  previous() {
    if (this.page === 0) {
      this.toastr.error('Không tìm thấy trang', '' , {
        timeOut : 2000,
        progressBar: false
      });
    } else {
      this.page = this.page - 1;
      this.getAll();
    }
  }

  next() {
    if (this.page > this.pages.length - 2) {
      this.toastr.error('Không tìm thấy trang', '' , {
        timeOut : 2000,
        progressBar: false
      });
    } else {
      this.page = this.page + 1;
      this.getAll();
    }
  }

  formatter = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 5
  });

  htmlToPDF() {
    if (this.idBillsales == null) {
      this.toastr.error("Không tìm thấy hóa đơn!!!")

    } else {
      const doc = new jsPDF('l', 'mm', 'a4');
      doc.addFileToVFS('src/assets/font/Calibri Light.ttf', this.fontBase.font);
      doc.addFont('src/assets/font/Calibri Light.ttf', 'Calibri Light', 'normal');
      doc.setFont('Calibri Light');
      doc.setFontSize(25);
      doc.setTextColor('red');
      doc.text('Hóa Đơn Bán Hàng', 110, 10);
      doc.text('Công ty KHOACHIEN Pharmacy', 90, 20);
      doc.setFontSize(20);
      doc.setTextColor('black');
      doc.text('Thông tin hóa đơn', 15, 30);
      doc.setFontSize(14);
      doc.text('Mã hóa đơn : ' + this.billSale1.billSaleCode, 50, 40);
      doc.text('Loại hóa đơn : ' + this.billSale1.billSaleType, 180, 40);
      doc.text('Tên khách hàng: : ' + this.billSale1.customer.customerName, 50, 50);
      doc.text('Ngày lập : ' + this.subDate(this.billSale1.invoiceDate), 180, 50);
      doc.text('Giờ lập: : ' + this.subTime(this.billSale1.invoiceDate), 50, 60);
      doc.text('Người lập : ' + this.billSale1.employee.employeeName, 180, 60);
      doc.text('Tổng tiền: : ' + this.formatter.format(this.billSale1.totalMoney), 50, 70);
      doc.text('Ghi chú: : ' + this.billSale1.billSaleNote, 180, 70);
      doc.text('Đà Nẵng , Ngày.........Tháng..........Năm..........', 160,  90);
      doc.text('Người lập phiếu', 190, 100);
      doc.save('Hóa đơn bán hàng ' + '.pdf');
    }

  }



  get searchValue1() {
    return this.searchForm.get('search1');
  }
  get searchValue2() {
    return this.searchForm.get('search2');
  }
  get searchValue3() {
    return this.searchForm.get('search3');
  }
  get searchValue4() {
    return this.searchForm.get('search4');
  }

}
