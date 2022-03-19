import {Component, OnDestroy, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ReplaySubject, Subject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {MatSelect} from '@angular/material/select';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {Exportbilltype} from '../../../../model/export-bill/exportbilltype';
import {Importbilldrug} from '../../../../model/export-bill/importbilldrug';
import {DialogService} from '../../../../service/export-bill/dialog.service';
import {validateDate} from '../validateDate';
import {ExportbilltypeService} from '../../../../service/export-bill/exportbilltype.service';
import {ImportbilldrugService} from '../../../../service/export-bill/importbilldrug.service';
import {ExportbillService} from '../../../../service/export-bill/exportbill.service';

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import {ToastrService} from "ngx-toastr";
import {TokenStorageService} from "../../../../user/user-service/token-storage.service";
import {FontBase64} from "../../../../font-base64";
import {DatePipe} from "@angular/common";
import {setOffsetToUTC} from "ngx-bootstrap/chronos/units/offset";

@Component({
  selector: 'app-export-bill-destroy',
  templateUrl: './export-bill-destroy.component.html',
  styleUrls: ['./export-bill-destroy.component.css']
})
export class ExportBillDestroyComponent implements OnInit, AfterViewInit, OnDestroy {
  exportBillForm: FormGroup;
  exportBillTypes: Exportbilltype[];
  drugs: Importbilldrug[] = [];
  drugDestroys: Importbilldrug[] = [];
  idDrug?: number;
  nameDrug?: string;
  totalMoney: number = 0;
  p = 1;
  a = [1, 2, 3, 4, 5];
  employeeName: string;
  bankCtrl: FormControl = new FormControl();
  bankFilterCtrl: FormControl = new FormControl();
  filteredBanks: ReplaySubject<Importbilldrug[]> = new ReplaySubject<Importbilldrug[]>(0);
  @ViewChild('drugSelect') drugSelect: MatSelect;
  @ViewChild('pdfTable') pdfTable: ElementRef;
  _onDestroy = new Subject<void>();

  constructor(private exportbilltypeService: ExportbilltypeService,
              private importbilldrugService: ImportbilldrugService,
              private  exportbillService: ExportbillService,
              private route: Router,
              private dialogService: DialogService,
              private snackBar: MatSnackBar,
              private toast : ToastrService,
              private tokenStorageService : TokenStorageService,
              private fontBase : FontBase64,
              private datePipe : DatePipe) {
    this.getExportBillType();
    this.importbilldrugService.getAllImportBillDrug().subscribe(data => {
      this.drugs = data;
      this.getListDrug();
    });
  }

  ngOnInit(): void {
    this.employeeName = this.tokenStorageService.getUser().employee.employeeName;
    this.createForm();
    this.setValueForm();
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
    verticalPosition: 'top',
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
      this.exportBillTypes = data;
      this.exportBillForm.patchValue({exportBillType: data[1]});
    });
  }

  createForm() {
    this.exportBillForm = new FormGroup({
      exportBillType: new FormControl('', [Validators.required]),
      exportBillCode: new FormControl('', [Validators.required]),
      exportBillDate: new FormControl({value: '', disabled: true}, [Validators.required, validateDate]),
      exportBillReason: new FormControl('', [Validators.required, Validators.pattern(/^\D+$/)]),
      exportBillAddress: new FormControl({value: '', disabled: true}),
      manufacturer: new FormControl({value: '', disabled: true}),
      employee: new FormControl({value: this.tokenStorageService.getUser().employee})
    });
  }

  setValueForm() {
    this.exportbillService.createCodeExportBillDestroy().subscribe(data => {
      this.exportBillForm.patchValue({
        exportBillCode: data[0],
        exportBillDate: this.getDateNow(),
        // employee: this.tokenStorageService.getUser().accountName,
      });
    }, error => {
      console.log(error);
    });

  }

  getListDrug() {
    let drugs = this.drugs;
    for (let i = 0; i < this.drugDestroys.length; i++) {
      drugs = drugs.filter(item => item.importBillDrugId != this.drugDestroys[i].importBillDrugId);
    }
    this.filteredBanks.next(drugs);
  }

  selectType(value: any) {
    if (Object.values(value)[0] == 0) {
      this.route.navigateByUrl('/management/warehouse/warehouse-export/export-bill-refund');
    }
  }

  selectRow(id: number, name: string) {
    const tr = document.getElementById(String(id));
    if (tr.style.backgroundColor == 'rgb(98, 184, 255)') {
      this.idDrug = null;
      tr.style.backgroundColor = null;
    } else {
      this.idDrug = id;
      this.nameDrug = name;
      for (let i = 0; i < this.drugDestroys.length; i++) {
        if (this.drugDestroys[i].importBillDrugId === id) {
          document.getElementById(String(this.drugDestroys[i].importBillDrugId)).style.backgroundColor = '#62b8ff';
        } else {
          document.getElementById(String(this.drugDestroys[i].importBillDrugId)).style.backgroundColor = null;
        }
      }
    }
  }

  selectDrug() {
    let data = this.bankCtrl.value;
    if (this.drugDestroys.includes(data) == false) {
      this.drugDestroys.push(data);
      this.totalMoney += data.importAmount * data.importPrice;

      this.getListDrug();
    }
  }

  getDateNow(): string {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  }

  compareFn(c1: Exportbilltype, c2: Exportbilltype): boolean {
    return c1 && c2 ? c1.exportBillTypeId === c2.exportBillTypeId : c1 === c2;
  }

  setInitialValue() {
    this.filteredBanks
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.drugSelect.compareWith = (a: Importbilldrug, b: Importbilldrug) => a && b && a.importBillDrugId === b.importBillDrugId;
      });
  }

  filterBanks() {
    if (!this.drugs) {
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
      this.drugs.filter(data => (data.drug.drugName + data.importBill.importSystemCode).toLowerCase().indexOf(search) > -1)
    );
  }

  deleteDrug() {
    if (this.idDrug == null) {
      this.toast.warning('Bạn chưa chọn thuốc');
    } else {

      this.dialogService.openConfirm( this.nameDrug ).afterClosed().subscribe(result => {
          if (result === true) {
            this.drugDestroys = this.drugDestroys.filter(item => {
                if (item.importBillDrugId !== this.idDrug) {
                  return item;
                } else {
                  this.totalMoney -= (item.importAmount * item.importPrice);
                }
              }
            );
            this.idDrug = null;
            this.toast.success('Xóa thuốc thành công');
          }
        }, error => {
          this.toast.warning('Bạn chưa chon thuốc');
        },
        () => {
          this.bankCtrl.setValue('');
          this.getListDrug();
        });
    }
  }

  createExportBill() {
    if (!this.exportBillForm.valid || this.drugDestroys.length == 0) {
      this.toast.warning('Bạn phải nhập đủ thông tin hóa đơn');
    } else {
      this.exportBillForm.get('employee').setValue(this.tokenStorageService.getUser().employee);

      let exportBill = this.exportBillForm.value;
      console.log(exportBill);
      this.exportbillService.createExportBill(exportBill).subscribe(data => {
        for (let i = 0; i < this.drugDestroys.length; i++) {
          let exportBillDetail = {
            exportBill: data,
            importBillDrug: this.drugDestroys[i]
          };
          this.exportbillService.createExportBillDetail(exportBillDetail).subscribe(() => {
          });
        }
        this.toast.success('Tạo hóa đơn thành công');
        this.route.navigateByUrl('/management/warehouse/warehouse-export/export-bill');
      }, error => {
        this.toast.warning('Tạo hóa đơn thất bại');
      });
    }
  }
  formatter = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'VND',
  });

  htmlToPDF() {
    if (this.exportBillForm.invalid || this.drugDestroys.length == 0) {
      this.toast.error('Bạn phải nhập đủ thông tin');
    } else {
      const doc = new jsPDF('l', 'mm', 'a4');
      doc.addFileToVFS('src/assets/font/Calibri Light.ttf', this.fontBase.font);
      doc.addFont('src/assets/font/Calibri Light.ttf', 'Calibri Light', 'normal');
      doc.setFont('Calibri Light');
      const head = [['STT', 'Tên thuốc', 'Số HĐ', 'Đơn vị tính', 'Số lượng', 'Đơn giá', 'Thành tiền', 'Ngày lập', 'Hạn dùng']];
      const body = [];
      this.drugDestroys.forEach((d, i) => {
        let temp = [i + 1, d.drug.drugName, d.importBill.importSystemCode, d.drug.unit, d.importAmount, this.formatter.format(d.importPrice), this.formatter.format(d.importAmount * d.importPrice), this.datePipe.transform(d.importBill.invoiceDate, 'dd/MM/yyyy'), this.datePipe.transform(d.expiry, 'dd/MM/yyyy')];
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
      doc.text('Nhà cung cấp : N/A', 180, 40);
      doc.text('Số HD:  ' + this.exportBillForm.get('exportBillCode').value, 50, 50);
      doc.text('Địa Chỉ : N/A', 180, 50);
      doc.text('Ngày lập:  ' + this.datePipe.transform(this.exportBillForm.get('exportBillDate').value, 'dd/MM/yyyy'), 50, 60);
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
      doc.text('Tổng tiền : ' + this.formatter.format(this.totalMoney), 230, this.drugDestroys.length * 8.5 + 125);
      doc.setTextColor('black');
      doc.text('Đà Nẵng , Ngày......Tháng.......Năm.......', 15, this.drugDestroys.length * 8.5 + 125);
      doc.text('Người lập phiếu', 28, this.drugDestroys.length * 7.5 + 140);
      doc.save('Hóa đơn xuất kho ' + this.getDateNow() + '.pdf');
    }
  }
  returnList() {
    this.dialogService.openConfirm1('Bạn có muốn hủy hóa đơn đang lâp và trở về màn hình quản lý hay không?').afterClosed().subscribe(result => {
      if (result === true) {
        this.route.navigateByUrl('/management/warehouse/warehouse-export/export-bill');
      }
    }, error => {
      console.log('Not found!!!');
    });
  }

}
