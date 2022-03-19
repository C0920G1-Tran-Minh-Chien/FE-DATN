import {Component, OnInit} from '@angular/core';
import {DrugOfBill} from '../../../model/drug-of-bill';
import {Drug} from '../../../model/drug';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {DrugService} from '../../../service/drug.service';
import {BillSaleService} from '../../../service/bill-sale.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Customer} from '../../../model/customer';
import {Employee} from '../../../model/employee';
import {DeleteComponent} from '../delete/delete.component';
import {DatePipe, formatDate} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {CustomerService} from "../../../service/customer.service";
import {TokenStorageService} from "../../../user/user-service/token-storage.service";
import {BillSale} from "../../../model/bill-sale";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {FontBase64} from "../../../font-base64";

@Component({
  selector: 'app-wholesale',
  templateUrl: './wholesale.component.html',
  styleUrls: ['./wholesale.component.css']
})
export class WholesaleComponent implements OnInit {
  drugOfBillList: DrugOfBill[] = [];
  billSaleLast: BillSale;
  idSelect: number;
  total: number;
  drugs: Drug[] = [];
  selectDrug = null;
  drugOfBill: DrugOfBill;
  index: number;
  quantity: number;
  employeeName;
  today = new Date();
  idDrugDelete : any;
  todaysDataTime = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss', 'en-EN', 'GMT+7');
  customerList: Customer[] = [];
  employeeList: Employee[] = [];
  billSaleForm: FormGroup = new FormGroup(
    {
      billSaleId: new FormControl(),
      employee: new FormControl(this.tokenStorageService.getUser().employee.employeeName),
      billSaleCode: new FormControl('HDBS'),
      invoiceDate: new FormControl(this.todaysDataTime),
      customer: new FormControl(),
      billSaleNote: new FormControl(''),
      totalMoney: new FormControl(),
      billSaleType: new FormControl('Bán sỉ'),
    }
  );

  constructor(private dialog: MatDialog,
              private router: Router,
              private billSaleService: BillSaleService,
              private  toast: ToastrService,
              private drugService: DrugService,
              private customerService: CustomerService,
              private tokenStorageService : TokenStorageService,
              private datePipe : DatePipe,
              private fontBase64 : FontBase64) {
    this.employeeName = this.tokenStorageService.getUser().employee.employeeName ;
    const state = this.router.getCurrentNavigation().extras.state as { data };
    if (state != null) {
      this.drugOfBillList = state.data;
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.drugOfBillList.length; i++) {
      this.total += this.drugOfBillList[i].quantity * this.drugOfBillList[i].drug.wholesalePrice;
    }
  }

  ngOnInit(): void {
    this.getAllDrug();
    this.getAllCustomer();
    // this.getAllEmployee();
    this.getBillSaleLast();
  }
  getBillSaleLast() {
    this.billSaleService.findBillSaleLast().subscribe(next => {
      this.billSaleLast = next;
    });
  }

  getAllDrug() {
    this.drugService.getAllDrugPrice().subscribe(next => {
      this.drugs = next;
    });
  }

  getAllCustomer() {
    this.customerService.getAllCustomerWholeSale().subscribe(next => {
      this.customerList = next;
    });
  }



  payment() {
    // tslint:disable-next-line:max-line-length
    if (this.billSaleForm.get('customer').value == null || this.billSaleForm.get('employee').value == null || this.drugOfBillList.length === 0) {
      this.toast.error('Thanh toán thất bại', 'Alert');
    } else {
      this.billSaleForm.get('totalMoney').setValue(Math.round(this.total));
      this.billSaleForm.get('employee').setValue(this.tokenStorageService.getUser().employee);
      this.billSaleForm.get('billSaleId').setValue(this.billSaleLast.billSaleId+1);
      this.billSaleForm.get('invoiceDate').setValue(formatDate(this.today, 'yyyy-MM-dd hh:mm:ss', 'en-EN', 'GMT+7'))
      const billSale = this.billSaleForm.value;
      console.log(billSale);
      this.billSaleService.createBillSale(billSale).subscribe((billSale) => {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.drugOfBillList.length; i++) {
            this.drugOfBill = {billSale: billSale,drug: this.drugOfBillList[i].drug,quantity: this.drugOfBillList[i].quantity}
            // this.drugOfBill = this.drugOfBillList[i];
            // this.drugOfBill.billSale.billSaleId = this.billSaleLast.billSaleId+1;
            console.log(this.drugOfBill);

            this.billSaleService.createDrugOfBill(this.drugOfBill).subscribe(() => {
              console.log(this.drugOfBill);
            });
          }
          this.toast.success('Thanh toán thành công', 'Alert');
          window.location.reload();
        }, error => {
          this.toast.error('Thanh toán thất bại', 'Alert');
        }
      );
    }
  }

  send(drugOfBill, index,drugName) {
    this.drugOfBill = drugOfBill;
    this.idSelect = index;
    this.idDrugDelete = drugName;
  }

  openDeleteDialog() {
    const drugOfBill = this.drugOfBill;
    if (this.idSelect == undefined) {
      this.toast.error('Chưa chọn thuốc để xóa', 'Alert');
    } else {
      const dialog = this.dialog.open(DeleteComponent, {
        width: '500px',height: '300px',
        data: [this.drugOfBillList, {drugOfBill},this.idDrugDelete]
      });
      dialog.afterClosed().subscribe(() => {
        this.total = 0;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.drugOfBillList.length; i++) {
          this.total += this.drugOfBillList[i].quantity * this.drugOfBillList[i].drug.wholesalePrice;
        }
      });
    }
  }

  addDrug(drug, number1) {
    if (this.billSaleForm.get('customer').value == null || this.billSaleForm.get('employee').value == null) {
      this.toast.warning('Chọn đủ thông tin hóa đơn trước khi thêm thuốc', 'Alert');
    } else if (this.selectDrug === null || this.quantity === undefined) {
      this.toast.warning('Vui lòng chọn thuốc và nhập số lượng', 'Alert');
    } else if (this.quantity <= 0) {
      this.toast.warning('Số lượng không hợp lệ', 'Alert');
    } else {
      this.drugOfBill = {drug, quantity: number1, billSale: this.billSaleForm.value};
      this.drugOfBillList.push(this.drugOfBill);
      this.total = 0;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.drugOfBillList.length; i++) {
        this.total += this.drugOfBillList[i].quantity * this.drugOfBillList[i].drug.wholesalePrice;
      }
    }
  }
  formatter = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'VND',
  });
  htmlToPDF() {
    if (this.billSaleForm.get('customer').value == null || this.billSaleForm.get('employee').value == null) {
      this.toast.warning('Chọn đủ thông tin hóa đơn trước khi in phiếu', 'Alert');
    }
    else if(this.drugOfBillList.length == 0){
      this.toast.warning('Chưa có thuốc để in phiếu', 'Alert');
    }else {
      const doc = new jsPDF('l', 'mm', 'a4');
      doc.addFileToVFS('src/assets/font/Calibri Light.ttf', this.fontBase64.font);
      doc.addFont('src/assets/font/Calibri Light.ttf', 'Calibri Light', 'normal');
      doc.setFont('Calibri Light');
      const head = [['STT', 'Tên thuốc', 'Đơn vị tính', 'Số lượng', 'Đơn giá', 'Thành tiền']];
      const body = [];
      let number1 = 1;
      this.drugOfBillList.forEach(d => {

        let temp = [number1++, d.drug.drugName, d.drug.unit, d.quantity,
          this.formatter.format(d.drug.wholesalePrice), this.formatter.format(d.drug.wholesalePrice * d.quantity),];
        body.push(temp);
      });
      doc.setFontSize(25);
      doc.setTextColor('red');
      doc.text('Hóa Đơn Bán Sỉ', 110, 10);
      doc.text('Công ty KHOACHIEN Pharmacy', 90, 20);
      doc.setFontSize(20);
      doc.setTextColor('black');
      doc.text('Thông tin hóa đơn', 15, 30);
      doc.setFontSize(14);
      doc.text('Số Phiếu: HDBS' + (this.billSaleLast.billSaleId + 1), 50, 40);
      doc.text('Khách hàng: : ' + this.billSaleForm.get('customer').value.customerName, 180, 40);
      doc.text('Nhân viên: : ' + this.employeeName, 50, 50);
      doc.text('Ghi chú : ' + this.billSaleForm.get('billSaleNote').value, 180, 50);
      doc.text('Ngày lập: : ' + this.todaysDataTime, 50, 60);
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
      doc.text('Tổng tiền : ' + this.formatter.format(this.total), 230, this.drugOfBillList.length * 8.5 + 105);
      doc.setTextColor('black');
      doc.text('Đà Nẵng , Ngày......Tháng.......Năm.......', 15, this.drugOfBillList.length * 8.5 + 105);
      doc.text('Người lập phiếu', 28, this.drugOfBillList.length * 7.5 + 115);
      doc.save('Hóa đơn bán lẻ ' + this.todaysDataTime + '.pdf');
      this.toast.success('Thành công', 'Alert')
    }
  }
}
