import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ExportbilltypeService} from '../../../../service/export-bill/exportbilltype.service';
import {ImportbilldrugService} from '../../../../service/export-bill/importbilldrug.service';

import {Exportbilltype} from '../../../../model/export-bill/exportbilltype';
import {Importbilldrug} from '../../../../model/export-bill/importbilldrug';
import {DatePipe} from '@angular/common';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {DialogService} from '../../../../service/export-bill/dialog.service';
import {Router} from '@angular/router';
import {ReplaySubject, Subject} from 'rxjs';
import {MatSelect} from '@angular/material/select';
import {take, takeUntil} from 'rxjs/operators';
import jsPDF from 'jspdf'
import {ExportbillService} from '../../../../service/export-bill/exportbill.service';
import autoTable from 'jspdf-autotable';
import {ToastrService} from "ngx-toastr";
import {TokenStorageService} from "../../../../user/user-service/token-storage.service";
import {ManufacturerService} from "../../../../service/manufacturer.service";
import {Manufacturer} from 'src/app/model/manufacturer';
import {FontBase64} from "../../../../font-base64";


@Component({
  selector: 'app-export-bill-refund',
  templateUrl: './export-bill-refund.component.html',
  styleUrls: ['./export-bill-refund.component.css']
})
export class ExportBillRefundComponent implements OnInit, AfterViewInit, OnDestroy {
  exportBillForm: FormGroup;
  exportBillType: Exportbilltype[] = [];
  importBillDrug: Importbilldrug[] = [];
  manufacturer: Manufacturer[] = [];
  addressManufacture = '';
  drugRefund: Importbilldrug[] = [];
  total = 0;
  p = 1;
  a = [1, 2, 3, 4, 5];
  idDrug: number;
  nameDrug: string;
  click = true;
  bankCtrl: FormControl = new FormControl();
  bankFilterCtrl: FormControl = new FormControl();
  filteredBanks: ReplaySubject<Importbilldrug[]> = new ReplaySubject<Importbilldrug[]>(0);
  @ViewChild('drugSelect') drugSelect: MatSelect;
  @ViewChild('pdfContent') pdfContent: ElementRef;
  _onDestroy = new Subject<void>();
  manuObj = null;
  exportCode: string;
  employee;

  formatter = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'VND',
  });


  constructor(private exportbilltypeService: ExportbilltypeService,
              private importbilldrugService: ImportbilldrugService,
              private manufacturerService: ManufacturerService,
              private matDialog: MatDialog,
              private snackBar: MatSnackBar,
              private dialogService: DialogService,
              private exportbillService: ExportbillService,
              private router: Router,
              private toastr: ToastrService,
              private tokenStorageService: TokenStorageService,
              private datePipe : DatePipe,
              private fontBase : FontBase64
  ) {
    this.createForm();


  }

  ngOnInit(): void {
    this.employee = this.tokenStorageService.getUser().employee;
    this.getAllExportBillType();
    this.getAllManufacturer();
    this.setValueForm();
    this.getExportBillType();
    this.bankFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
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

  getExportBillType() {
    this.exportbilltypeService.getAllExportBillType().subscribe(data => {
      this.exportBillType = data;
      this.exportBillForm.patchValue({exportBillType: data[0]});
    });
  }


  createForm() {
    this.exportBillForm = new FormGroup({
      exportBillType: new FormControl('', [Validators.required]),
      exportBillCode: new FormControl('', [Validators.required, Validators.pattern('^HDXT[\\d]{5}$')]),
      exportBillDate: new FormControl('', [Validators.required, Validators.pattern("^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$")]),
      employee: new FormControl({value: ''}),
      exportBillReason: new FormControl('', [Validators.required]),
      exportBillAddress: new FormControl('', [Validators.required]),
      manufacturer: new FormControl(this.manuObj, [Validators.required])
    });
  }

  setValueForm() {
    this.exportbillService.createCodeExportBillRefund().subscribe(data => {
      this.exportCode = data;
      this.exportBillForm.patchValue({
        exportBillCode: data[0],
        exportBillDate: this.getDateNow(),
        // employee : this.tokenStorageService.getUser().accountName,
      });
    }, error => {
      console.log(error)
    });
  }


  getAllExportBillType() {
    this.exportbilltypeService.getAllExportBillType().subscribe(res => {
      this.exportBillType = res;
    });
  }

  getAllManufacturer() {
    this.manufacturerService.findAllNormal().subscribe(res => {
      this.manufacturer = res
    });
  }


  getListDrug() {
    let listDrug = this.importBillDrug;
    for (let i = 0; i < this.drugRefund.length; i++) {
      listDrug = listDrug.filter(item => item.importBillDrugId != this.drugRefund[i].importBillDrugId)
    }
    this.filteredBanks.next(listDrug);
  }

  selectDrug() {
    let res = this.bankCtrl.value;
    console.log(res);
    if (this.drugRefund.includes(res) == false) {
      this.drugRefund.push(res);
      this.total += (res.importAmount * res.importPrice) - (res.discountRate * res.importPrice * res.importAmount / 100) - (res.importAmount * res.importPrice * res.vat / 100);
      this.getListDrug();
    } else {
      this.toastr.warning("Bạn chưa chọn thuốc!!!", "Cảnh báo!!!")
    }
  }

  getDateNow(): string {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  }

  selectedObj: Importbilldrug;

  onselect(drugRefund: Importbilldrug) {
    this.selectedObj = drugRefund;
  }

  deleteDrug() {
    if (this.idDrug == null) {
      this.toastr.warning("Bạn chưa chọn thuốc!!!", "Cảnh báo!!!")
    } else {
      this.dialogService.openConfirm( this.nameDrug ).afterClosed().subscribe(res => {
        if (res === true) {
          this.drugRefund = this.drugRefund.filter(item => item.importBillDrugId !== this.idDrug);
          this.toastr.success('Bạn đã xóa thuốc thành công');
          this.idDrug = null;
        }
        this.total = 0;
        for (let i = 0; i < this.drugRefund.length; i++) {
          this.total += (this.drugRefund[i].importAmount * this.drugRefund[i].importPrice) - (this.drugRefund[i].discountRate * this.drugRefund[i].importPrice / 100) - (this.drugRefund[i].importAmount * this.drugRefund[i].importPrice * this.drugRefund[i].vat / 100);
        }
      }, error => {
        this.toastr.warning('Bạn chưa chọn thuốc');
      });
    }
  }

  setInitialValue() {
    this.filteredBanks
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.drugSelect.compareWith = (a: Importbilldrug, b: Importbilldrug) => a && b && a.importBillDrugId === b.importBillDrugId;
      });
  }

  filterBanks() {
    if (!this.importBillDrug) {
      return;
    }
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.getListDrug();
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredBanks.next(
      this.importBillDrug.filter(data => (data.drug.drugName).toLowerCase().indexOf(search) > -1)
    );
  }

  compareFn(c1: Exportbilltype, c2: Exportbilltype): boolean {
    return c1 && c2 ? c1.exportBillTypeId === c2.exportBillTypeId : c1 === c2;
  }

  selectType(value: string) {
    // @ts-ignore
    console.log(Object.values(value));
    // @ts-ignore
    if (Object.values(value)[0] == 3) {
      this.router.navigateByUrl('/export-bill-destroy');
    }
  }

  compareFn1(c1: Manufacturer, c2: Manufacturer): boolean {
    return c1 && c2 ? c1.manufacturerId === c2.manufacturerId : c1 === c2;
  }

  idManufacture = 0;


  changeName(e) {
    this.manufacturerService.findByIdManufacture(e.target.value).subscribe((res: Manufacturer) => {
      if (res != null) {
        this.manuObj = res;
        this.exportBillForm.patchValue({
          manufacture: res,
          exportBillAddress: res.manufacturerAddress,
        })
      }
      console.log(res);
    });
    this.getDrugBillByManufacturerId(e.target.value);
  }


  deleteById(importBillDrugId) {
    this.click = !this.click;
    if (this.click == false) {
      this.idDrug = importBillDrugId;
      for (let i = 0; i < this.drugRefund.length; i++) {
        if (this.idDrug === this.drugRefund[i].importBillDrugId) {
          this.nameDrug = this.drugRefund[i].drug.drugName;
        }
      }
    } else {
      this.idDrug = null;
    }

  }


  htmlToPDF() {
    if (this.exportBillForm.invalid || this.drugRefund.length == 0) {
      this.toastr.error('Bạn phải nhập đủ thông tin');
    } else {
      const doc = new jsPDF('l', 'mm', 'a4');
      doc.addFileToVFS('src/assets/font/Calibri Light.ttf', this.fontBase.font);
      doc.addFont('src/assets/font/Calibri Light.ttf', 'Calibri Light', 'normal');
      doc.setFont('Calibri Light');
      const head = [['STT', 'Tên thuốc', 'Đơn vị tính', 'Số lượng', 'Đơn giá', '%CK', 'Tiền CK', 'VAT', 'Thành tiền', 'Hạn dùng']];
      const body = [];
      let number1 = 1;
      this.drugRefund.forEach(d => {

        let temp = [number1++, d.drug.drugName, d.drug.unit, d.importAmount, this.formatter.format(d.importPrice), d.discountRate, this.formatter.format(((d.discountRate * d.importPrice * d.importAmount) / 100)),
          d.vat, this.formatter.format((d.importAmount * d.importPrice) - (d.discountRate * d.importPrice * d.importAmount / 100) - (d.importAmount * d.importPrice * d.vat / 100)),
          this.datePipe.transform(d.expiry, 'dd/MM/yyyy')];
        body.push(temp);
      });
      doc.setFontSize(25);
      doc.setTextColor('red');
      doc.text('Hóa Đơn Xuất Kho', 110, 10);
      doc.text('Công ty C0221G1 Pharmacy', 90, 20);
      doc.setFontSize(20);
      doc.setTextColor('black');
      doc.text('Thông tin hóa đơn', 15, 30);
      doc.setFontSize(14);
      doc.text('Loại hóa đơn : ' + this.exportBillForm.get('exportBillType').value.exportBillTypeName, 50, 40);
      doc.text('Nhà cung cấp : ' + this.manuObj.manufacturerName, 180, 40);
      doc.text('Số HD:  ' + this.exportBillForm.get('exportBillCode').value, 50, 50);
      doc.text('Địa Chỉ : ' + this.exportBillForm.get('exportBillAddress').value, 180, 50);
      doc.text('Ngày lập:  ' + this.datePipe.transform(this.exportBillForm.get('exportBillDate').value,'dd/MM/yyyy'), 50, 60);
      doc.text('Lí do : ' + this.exportBillForm.get('exportBillReason').value, 180, 60);
      doc.text('Nhân viên:  ' + this.tokenStorageService.getUser().employee.employeeName, 50, 70);
      doc.setFontSize(20);
      doc.text('Danh sách thuốc', 15, 90);
      doc.setFontSize(14);
      autoTable(doc, {
        styles: {
          font: 'Calibri Light',
          fontSize: 14
        },
        margin: {top: 100},
        head: head,
        body: body,
        didDrawCell: (data) => {
        },
      },);
      doc.setTextColor('red');
      doc.text('Tổng tiền : ' + this.formatter.format(this.total), 230, this.drugRefund.length * 8.5 + 125);
      doc.setTextColor('black');
      doc.text('Đà Nẵng , Ngày......Tháng.......Năm.......', 15, this.drugRefund.length * 8.5 + 125);
      doc.text('Người lập phiếu', 28, this.drugRefund.length * 7.5 + 140);
      doc.save('Hóa đơn xuất kho ' + this.getDateNow() + '.pdf');
    }

  }

  getDrugBillByManufacturerId(id: number) {
    this.importbilldrugService.getByManufacturerId(id).subscribe(res => {
      this.importBillDrug = res;
      // @ts-ignore
      this.filteredBanks.next(
        this.importBillDrug.filter(data => (data.drug.drugName).toLowerCase())
      );
    });
  }

  getBackExportManagerment() {
    this.dialogService.openConfirm1('Bạn có muốn hủy hoán đơn đang lập và trở về màn hình quản lý hay không ?')
      .afterClosed().subscribe(res => {
      if (res == true) {
        this.backToManagementScreen();
      }

    });
  }

  backToManagementScreen() {
    this.router.navigateByUrl('/export-bill');
  }

  today = new Date();

  createExportBill() {
    if (!this.exportBillForm.valid || this.drugRefund.length == 0) {
      this.toastr.error('Bạn phải nhập đủ thông tin')
    } else {
      this.exportBillForm.get('employee').setValue(this.tokenStorageService.getUser().employee);
      let exportBill = this.exportBillForm.value;
      exportBill.manufacturer = this.manuObj;
      exportBill.exportBillDate += " " + this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds();
      this.exportbillService.createExportBill(exportBill).subscribe(data => {
        console.log(data);
        for (let i = 0; i < this.drugRefund.length; i++) {
          let exportBillDetail = {
            exportBill: data,
            importBillDrug: this.drugRefund[i]
          };
          this.exportbillService.createExportBillDetail(exportBillDetail).subscribe(() => {
          }, error => {
            console.log("thất bại")
          })
        }
        this.toastr.success('Tạo hóa đơn thành công');
        setTimeout(() => {
          this.backToManagementScreen();
        }, 1500)
      }, error => {
        this.warn('Tạo hóa đơn thất bại')
      });
    }
  }
}
