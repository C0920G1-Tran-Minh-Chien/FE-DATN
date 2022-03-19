import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ExportbillService} from "../../../../service/export-bill/exportbill.service";
import {Exportbilltype} from "../../../../model/export-bill/exportbilltype";
import {Employee} from "../../../../model/export-bill/employee";
import {Manufacturer} from "../../../../model/export-bill/manufacturer";

@Component({
  selector: 'app-export-bill-print',
  templateUrl: './export-bill-print.component.html',

})
export class ExportBillPrintComponent implements OnInit {

  message: string;

  exportBillCode: String;
  exportBillType: Exportbilltype;
  exportBillDate: String;
  employee: Employee;
  manufacturer : Manufacturer;
  exportBillReason: String;

  constructor(public dialogRef: MatDialogRef<ExportBillPrintComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private exportBillService: ExportbillService) {
    this.exportBillService.getCaseRecordById(this.data.id).subscribe(exportBill => {
      this.exportBillCode = exportBill.exportBillCode;
      this.exportBillType = exportBill.exportBillType;
      this.exportBillDate = exportBill.exportBillDate;
      this.employee = exportBill.employee;
      this.manufacturer = exportBill.manufacturer;
      this.exportBillReason = exportBill.exportBillReason;

      if (exportBill == null) {
        this.message = "Không có hóa đơn này";
      } else {
        this.message = "";
      }
    })
  }

  ngOnInit(): void {
  }

  print() {
    this.dialogRef.close(true);
    window.print();
  }

}
