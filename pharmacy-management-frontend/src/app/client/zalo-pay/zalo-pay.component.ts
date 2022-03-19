import { Component, Inject, INJECTOR, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-zalo-pay",
  templateUrl: "./zalo-pay.component.html",
  styleUrls: ["./zalo-pay.component.css"],
})
export class ZaloPayComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ZaloPayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    console.log(this.data);
  }
}
