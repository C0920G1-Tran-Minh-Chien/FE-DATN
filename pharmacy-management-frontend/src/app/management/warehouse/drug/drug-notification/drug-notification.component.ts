import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-drug-notification',
  templateUrl: './drug-notification.component.html',
  styleUrls: ['./drug-notification.component.css']
})
export class DrugNotificationComponent implements OnInit {

  notSelected = false;
  notFound = false;
  deleted = false;
  created = false;
  edited = false;
  constructor(  private dialogRef: MatDialogRef<DrugNotificationComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.notSelected = this.data.data1.valueOf();
    this.notFound = this.data.data2.valueOf();
    this.deleted = this.data.data3.valueOf();
    this.created = this.data.data4.valueOf();
    this.edited = this.data.data5.valueOf();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
