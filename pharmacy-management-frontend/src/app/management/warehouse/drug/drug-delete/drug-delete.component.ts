import {Component, Inject, OnInit} from '@angular/core';
import {DrugService} from '../../../../service/drug.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DrugNotificationComponent} from '../drug-notification/drug-notification.component';

@Component({
  selector: 'app-drug-delete',
  templateUrl: './drug-delete.component.html',
  styleUrls: ['./drug-delete.component.css']
})
export class DrugDeleteComponent implements OnInit {
  drugId;
  drugCode;
  deleted = false;
  constructor(private drugService: DrugService,
              private dialog: MatDialog,
              private dialogRef: MatDialogRef<DrugDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.drugId = this.data.data1.drugId;
    this.drugCode = this.data.data1.drugCode;
    console.log(this.drugId);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  notificationDialog(): void {
    const dialogRef = this.dialog.open(DrugNotificationComponent, {
      width: '500px',
      data: {data1: false, data2: false, data3: this.deleted}
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  delete() {
    this.drugService.deleteDrug(this.drugId).subscribe(data => {
      this.dialogRef.close();
      this.deleted = true;
      this.deleted = false;
    });
  }
}
