import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router, NavigationExtras} from '@angular/router';
import {DrugService} from '../../../service/drug.service';
import {Indicative} from '../../../model/indicative';
import {Drug} from '../../../model/drug';
import { DeleteComponent } from '../delete/delete.component';
import {PrescriptionService} from '../../../service/prescription.service';
import {ToastrService} from 'ngx-toastr';
import {DatePipe, formatDate} from '@angular/common';
import {DrugOfBill} from '../../../model/drug-of-bill';
import {BillSale} from '../../../model/bill-sale';
import {TokenStorageService} from "../../../user/user-service/token-storage.service";
import {timeout} from "rxjs/operators";
import {BillSaleService} from "../../../service/bill-sale.service";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {FontBase64} from "../../../font-base64";
import {Customer} from "../../../model/customer";
import {CustomerService} from "../../../service/customer.service";


@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  user;
  drugOfBills: DrugOfBill[] = [];
  total = 0;
  drugs: Drug[] = [];
  drug = null;
  drugOfBill: DrugOfBill;
  index: number;
  number1: number;
  drugOf: DrugOfBill;
  bill: BillSale;
  dateSetBill = '';
  note = '' ;
  billSaleCode = '';
  today = new Date();
  billSaleLast: BillSale;
  customerList: Customer[] = [];
  todaysDataTime = formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530');
  numRandom = Math.floor(Math.random() * 10000);
  constructor(private dialog: MatDialog,
              private router: Router,
              private drugService: DrugService,
              private prescriptionService: PrescriptionService,
              private toast: ToastrService,
              private tokenStorageService : TokenStorageService,
              private billSaleService : BillSaleService,
              private fontBase : FontBase64,
              private format : DatePipe,
              private customerService: CustomerService) {
    this.user = this.tokenStorageService.getUser();
    const state = this.router.getCurrentNavigation().extras.state as {data};
    if (state != null) {
      this.drugOfBills = state.data;
      for (let i = 0; i < this.drugOfBills.length; i++) {
        this.total += this.drugOfBills[i].quantity * this.drugOfBills[i].drug.retailPrice;
      }
    }
    // tslint:disable-next-line:prefer-for-of

    this.dateSetBill = this.todaysDataTime;

    this.billSaleCode = 'HDBL';
  }

  getAllCustomer() {
    this.customerService.getAll().subscribe(next => {
      this.customerList = next;
    });
  }

  ngOnInit(): void {
    this.getAllDrug();
    this.getLastBillSale();
    this.getAllCustomer();
  }
// fix sau (Đức)
  getLastBillSale(){
    this.billSaleService.findBillSaleLast().subscribe(next => {
      this.billSaleLast = next;
    });
  }
  getAllDrug() {
    this.drugService.getAllDrugPrice().subscribe(next => {
      this.drugs = next;
      console.log(next)
    });

  }
  send(drugOfBill, i) {
    this.drugOfBill = drugOfBill;
    this.index = i;
  }
  openDeleteDialog() {
    if (this.drugOfBill === undefined) {
      this.toast.error('Bạn chưa chọn thuốc!');
    } else {
      const drugOfBill = this.drugOfBill;
      const dialog = this.dialog.open(DeleteComponent , {
        height: '300px' , width: '500px',
        data: [this.drugOfBills , drugOfBill]
      });
      dialog.afterClosed().subscribe(() => {
        this.total = 0;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.drugOfBills.length; i++) {
          this.total += this.drugOfBills[i].quantity * this.drugOfBills[i].drug.retailPrice;
        }
        this.toast.success("Đã xóa thành công!")
      });
      this.drugOfBill = undefined;
      this.drugOf = null;
    }
  }

  addDrug(drug, number1) {
    if (drug === null) {
      this.toast.success('Bạn phải chọn thuốc cần thêm');
    } else if (number1 === undefined) {
      this.toast.success('Bạn phải nhập số lượng thuốc');
    } else {
      this.drugOfBill = {drug, quantity: number1};
      this.drugOfBills.push(this.drugOfBill);
      this.total = 0;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.drugOfBills.length; i++) {
        this.total += this.drugOfBills[i].quantity * this.drugOfBills[i].drug.retailPrice;
      }
    }
    this.drugOfBill = undefined;
  }

  showChoose(drugOfBill: Indicative) {
    this.drugOf = drugOfBill;
  }

  saveBill() {
    if (this.drugOfBills.length === 0) {
      this.toast.error('bạn chưa thêm thuốc vào hóa đơn');
    } else {
      this.bill = {
        billSaleId: this.billSaleLast.billSaleId + 1,
        billSaleCode: 'HDBL',
        customer: this.customerList[0],
        billSaleType : 'Bán lẻ',
        employee: this.user.employee,
        totalMoney: this.total,
        invoiceDate: this.todaysDataTime,
        billSaleNote: this.note
      };
      this.prescriptionService.saveBIll(this.bill).subscribe(next => {
        this.prescriptionService.findNewBill().subscribe(bill => {
          this.prescriptionService.findNewBill().subscribe(bil => {
            this.bill = bil;
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < this.drugOfBills.length; i++) {
              // this.drugOfBills[i].billSale.billSaleId = this.billSaleLast.billSaleId + 1;
              this.drugOfBills[i].billSale = this.bill;
              console.log(this.drugOfBills[i].billSale)
              this.prescriptionService.save(this.drugOfBills[i]).subscribe();
            }

            this.toast.success("Đã thanh toán thành công!!!");
            window.location.reload();
            const navigationExtras: NavigationExtras = {state: {data: this.bill}};
          });
        });
      });
    }
  }
  formatter = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'VND',
  });
  htmlToPDF() {
    const doc = new jsPDF('l', 'mm', 'a4');
    doc.addFileToVFS('src/assets/font/Calibri Light.ttf', this.fontBase.font);
    doc.addFont('src/assets/font/Calibri Light.ttf', 'Calibri Light', 'normal');
    doc.setFont('Calibri Light');
    const head = [['STT', 'Tên thuốc', 'Đơn vị tính', 'Số lượng', 'Đơn giá', 'Thành tiền']];
    const body = [];
    let number1 = 1;
    this.drugOfBills.forEach(d => {

      let temp = [number1++, d.drug.drugName, d.drug.unit, d.quantity,
        this.formatter.format(d.drug.retailPrice), this.formatter.format(d.drug.retailPrice * d.quantity),];
      body.push(temp);
    });
    doc.setFontSize(25);
    doc.setTextColor('red');
    doc.text('Hóa Đơn Bán Lẻ', 110, 10);
    doc.text('Công ty KHOACHIEN Pharmacy', 90, 20);
    doc.setFontSize(20);
    doc.setTextColor('black');
    doc.text('Thông tin hóa đơn', 15, 30);
    doc.setFontSize(14);
    doc.text('Số Phiếu: : ' + this.billSaleCode, 50, 40);
    doc.text('Khách hàng: : ' + 'khách lẻ', 180, 40);
    doc.text('Nhân viên: : ' + this.user.employee.employeeName, 50, 50);
    doc.text('Ghi chú : ' + this.note, 180, 50);
    doc.text('Ngày lập: : ' + this.format.transform(this.dateSetBill,'dd/MM/yyyy'), 50, 60);
    doc.setFontSize(20);
    doc.text('Danh sách thuốc', 15, 70);
    doc.setFontSize(14);
    autoTable(doc, {
      styles: {
        font: 'Calibri Light',
        fontSize: 14
      },
      margin: {top: 80},
      head: head,
      body: body,
      didDrawCell: (data) => {
      },
    },);
    doc.setTextColor('red');
    doc.text('Tổng tiền : ' + this.formatter.format(this.total), 230, this.drugOfBills.length * 8.5 + 105);
    doc.setTextColor('black');
    doc.text('Đà Nẵng , Ngày......Tháng.......Năm.......', 15, this.drugOfBills.length * 8.5 + 105);
    doc.text('Người lập phiếu', 28, this.drugOfBills.length * 7.5 + 115);
    doc.save('Hóa đơn bán lẻ ' + this.todaysDataTime + '.pdf');
  }
}
