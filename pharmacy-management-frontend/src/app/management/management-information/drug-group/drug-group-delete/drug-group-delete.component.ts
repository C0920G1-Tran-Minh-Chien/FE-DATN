import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-drug-group-delete',
  templateUrl: './drug-group-delete.component.html',
  styleUrls: ['./drug-group-delete.component.css']
})
export class DrugGroupDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DrugGroupDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
