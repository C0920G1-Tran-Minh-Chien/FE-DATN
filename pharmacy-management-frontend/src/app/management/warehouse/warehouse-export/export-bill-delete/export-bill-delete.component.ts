import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ExportbillService} from '../../../../service/export-bill/exportbill.service';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-export-bill-delete',
  templateUrl: './export-bill-delete.component.html',

})
export class ExportBillDeleteComponent implements OnInit {

  dt: Object;
  code: String;

  constructor(private exportBillService: ExportbillService,
              @Inject(MAT_DIALOG_DATA) public data,
              private snackBar: MatSnackBar) {
    this.exportBillService.getCaseRecordById(this.data.id).subscribe(exportBill => {
      this.code = exportBill.exportBillCode;
    })
    console.log(this.data.id + " " + this.dt);
  }

  ngOnInit(): void {

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

  delete() {
    this.exportBillService.delete(this.data.id).subscribe(() => {
      this.success("Xóa thành công");
    }, error => {
      this.warn("Xóa không thành công")
    });
  }

}
