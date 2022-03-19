import {Component, OnInit} from '@angular/core';
import {BillSaleService} from '../../../service/bill-sale.service';
import {BillSale} from '../../../model/bill-sale';
import {DrugOfBill} from '../../../model/drug-of-bill';
import {MatDialog} from '@angular/material/dialog';
import {DeleteCustomerRefundComponent} from '../delete-customer-refund/delete-customer-refund.component';
import {DatePipe, formatDate} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {Drug} from '../../../model/drug';
import {DrugDTO} from "../../../model/DrugDTO";
import {DrugService} from "../../../service/drug.service";
import {FontBase64} from "../../../font-base64";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

@Component({
  selector: 'app-customer-refund',
  templateUrl: './customer-refund.component.html',
  styleUrls: ['./customer-refund.component.css']
})
export class CustomerRefundComponent implements OnInit {
  idSelect: number;
  inputSearch: any;
  billSale: BillSale;
  total = 0;
  idDelete = 0;
  idDeleteList: [] = [];
  totalRefund = 0;
  today = new Date();
  todaysDataTime = '';
  getIDTest = 0;
  billSaleLast: BillSale;
  idDrugDelete : any;

  constructor(private billSaleService: BillSaleService,
              private dialog: MatDialog,
              private toast: ToastrService,
              private drugService: DrugService,
              private datePipe : DatePipe,
              private fontBase : FontBase64) {
  }

  drugOfBillList: DrugOfBill[];
  drugOfBill: DrugOfBill = {};
  drugOfBillListDelete: DrugOfBill[] = [];

  ngOnInit(): void {
    this.getBillSaleLast();
  }

  searchBillSale() {
    this.billSaleService.getBillSaleById(this.inputSearch).subscribe(data => {
      this.billSale = data;
      if (data == null) {
        this.toast.error('Không tìm thấy hóa đơn này', 'Alert');
        this.drugOfBillList = [];
        this.total = 0;
      } else {
        this.billSaleService.getDrugOfBillByBillSaleId(this.inputSearch).subscribe(data1 => {
          this.drugOfBillList = data1;
          if (data1 == null) {
          }
          this.total = 0;
          // tslint:disable-next-line:prefer-for-of

          for (let i = 0; i < this.drugOfBillList.length; i++) {
            this.drugService.getDrugPriceById(this.drugOfBillList[i].drug.drugId).subscribe(data2 => {
              this.drugOfBillList[i].drug = data2;
            });
            console.log(this.drugOfBillList[i]);
            this.total += this.drugOfBillList[i].quantity * this.drugOfBillList[i].drug.wholesalePrice;
          }
          console.log(this.drugOfBillList);
        }, error => {
        });
      }
      this.totalRefund = this.billSale.totalMoney;
    }, c => {
      this.toast.error('Không tìm thấy hóa đơn này', 'Alert');
    });
  }

  send(drugOfBill, index,drugName) {
    this.drugOfBill = drugOfBill;
    this.idSelect = index;
    this.idDrugDelete = drugName;
  }

  dialogDelete() {
    if(this.idSelect == undefined){
      this.toast.error('Chưa chọn thuốc để xóa', 'Alert');
    }else {
      const drugOfBill = this.drugOfBill;
      const dialogRef = this.dialog.open(DeleteCustomerRefundComponent, {
        width: '500px',height: '300px',
          data: [drugOfBill, this.drugOfBillList, this.drugOfBillListDelete,this.idDrugDelete]
        }
      );
      dialogRef.afterClosed().subscribe(() => {
        this.total = 0;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.drugOfBillList.length; i++) {
          this.total += this.drugOfBillList[i].quantity * this.drugOfBillList[i].drug.wholesalePrice;
        }
        // @ts-ignore
        this.idDeleteList.push(this.idDelete);
        this.idSelect = undefined
      });
    }
  }
  getBillSaleLast() {
    this.billSaleService.findBillSaleLast().subscribe(next => {
      this.billSaleLast = next;
    });
  }

  payment() {
    if (this.drugOfBillListDelete.length === 0) {
      this.toast.error('Hoàn trả thất bại', 'Alert');
    } else {
      this.billSale.totalMoney = Math.round(this.total);
      this.billSaleService.updateBillSale(this.billSale).subscribe(() => {
        this.billSale.billSaleId = this.billSaleLast.billSaleId+1;
        // @ts-ignore
        this.todaysDataTime = formatDate(this.today, 'yyyy-MM-dd hh:mm:ss', 'en-US', '+0530');
        this.billSale.invoiceDate = this.todaysDataTime;
        this.billSale.billSaleCode = 'HDHT';
        this.billSale.billSaleNote = 'Khách hoàn trả';
        this.billSale.billSaleType = 'Hoàn trả';
        this.billSale.totalMoney = Math.round(this.totalRefund - this.total);
        this.billSaleService.createBillSale(this.billSale).subscribe(() => {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.drugOfBillListDelete.length; i++) {
            this.drugOfBill = this.drugOfBillListDelete[i][0];
            this.drugOfBill.billSale = this.billSale;
            this.getIDTest = this.drugOfBill.drug.drugId;
            // this.searchDrug(this.getIDTest);
            this.billSaleService.createDrugOfBill(this.drugOfBill).subscribe(() => {
              this.searchBillSale();
            });
            this.searchBillSale();
          }
          this.toast.success('Hoàn trả thành công', 'Alert');
          // this.drugOfBillListDelete = [];
          window.location.reload();
        }, error => {
          this.toast.error('Hoàn trả thất bại', 'Alert');
        });
      });
    }

  }

  getID(drugOfBillId: number) {
    // @ts-ignore
    this.idDelete = drugOfBillId;
  }

  formatter = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'VND',
  });

  htmlToPDF() {
    console.log(this.drugOfBillListDelete)
    if (this.billSale == null || this.billSale == undefined) {
      this.toast.warning('Chưa có hóa đơn để in', 'Alert');
    } else if(this.drugOfBillListDelete.length == 0) {
      this.toast.warning('Chưa thuốc hoàn trả', 'Alert');
    } else {
      const doc = new jsPDF('l', 'mm', 'a4');
      doc.addFileToVFS('src/assets/font/Calibri Light.ttf', this.fontBase.font);
      doc.addFont('src/assets/font/Calibri Light.ttf', 'Calibri Light', 'normal');
      doc.setFont('Calibri Light');
      const head = [['STT', 'Tên thuốc', 'Đơn vị tính', 'Số lượng', 'Đơn giá', 'Thành tiền']];
      const body = [];
      let number1 = 1;
      for(let i =0;i<this.drugOfBillListDelete.length;i++){
        // @ts-ignore
        for(let j =0;j < this.drugOfBillListDelete[i].length;j++){
          let temp = [number1++, this.drugOfBillListDelete[i][j].drug.drugName, this.drugOfBillListDelete[i][j].drug.unit,
            this.drugOfBillListDelete[i][j].quantity,
            this.formatter.format(this.drugOfBillListDelete[i][j].drug.wholesalePrice),
            this.formatter.format(this.drugOfBillListDelete[i][j].drug.wholesalePrice * this.drugOfBillListDelete[i][j].quantity)];
          body.push(temp);
        }
      }
      // this.drugOfBillListDelete.forEach(d => {
      //   for(let i =0;i< this.drugOfBillListDelete.length;i++){
      //     let temp = [number1++, d[i].drug.drugName, d[i].drug.unit, d[i].quantity,
      //       this.formatter.format(d[i].drug.wholesalePrice), this.formatter.format(d[i].drug.wholesalePrice * d[i].quantity),];
      //     body.push(temp);
      //   }
      //   // let temp = [number1++, d.drug.drugName, d.drug.unit, d.quantity,
      //   //   this.formatter.format(d.drug.wholesalePrice), this.formatter.format(d.drug.wholesalePrice * d.quantity),];
      //   // body.push(temp);
      // });

      doc.setFontSize(25);
      doc.setTextColor('red');
      doc.text('Hóa Đơn Hoàn Trả Thuốc', 110, 10);
      doc.text('Công ty KHOACHIEN Pharmacy', 90, 20);
      doc.setFontSize(20);
      doc.setTextColor('black');
      doc.text('Thông tin hóa đơn', 15, 30);
      doc.setFontSize(14);
      doc.text('Số Phiếu: HDHT' + (this.billSaleLast.billSaleId + 1), 50, 40);
      doc.text('Khách hàng:  ' + this.billSale.customer.customerName, 180, 40);
      doc.text('Nhân viên:  ' + this.billSale.employee.employeeName, 50, 50);
      doc.text('Ghi chú : Khách hoàn trả thuốc.' , 180, 50);
      doc.text('Ngày lập:  ' + formatDate(this.today, 'dd-MM-yyyy', 'en-US', '+0530'), 50, 60);
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
      doc.text('Tổng tiền : ' + this.formatter.format( Math.round(this.totalRefund - this.total)), 230, this.drugOfBillListDelete.length * 8.5 + 105);
      doc.setTextColor('black');
      doc.text('Đà Nẵng , Ngày......Tháng.......Năm.......', 15, this.drugOfBillListDelete.length * 8.5 + 105);
      doc.text('Người lập phiếu', 28, this.drugOfBillListDelete.length * 7.5 + 115);
      doc.save('Hóa đơn bán lẻ ' + this.todaysDataTime + '.pdf');
      this.toast.success('Thành công', 'Alert')

    }
  }



}
