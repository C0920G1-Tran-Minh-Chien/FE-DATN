import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../management/warehouse/warehouse-export/dialog/dialog.component';
import {DialogReturnComponent} from "../../management/warehouse/warehouse-export/dialog-return/dialog-return.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirm(msg) {
    return  this.dialog.open(DialogComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: {top: "200px"},
      data: {
        message: msg,
      }
    })
  };
  openConfirm1(msg) {
    return  this.dialog.open(DialogReturnComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: {top: "200px"},
      data: {
        message: msg,
      }
    })
  };
}
