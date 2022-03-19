import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-prescription-delete',
  templateUrl: './prescription-delete.component.html',
  styleUrls: ['./prescription-delete.component.css']
})
export class PrescriptionDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PrescriptionDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
