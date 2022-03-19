import {Component, Inject, OnInit} from '@angular/core';
import {ManufacturerService} from "../../../service/manufacturer.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ImportBill} from "../../../model/import-bill";

@Component({
  selector: 'app-import-bill-show',
  templateUrl: './import-bill-show.component.html',
  styleUrls: ['./import-bill-show.component.css']
})
export class ImportBillShowComponent implements OnInit {
importBill: ImportBill;
  constructor(private manufacturerService: ManufacturerService, @Inject(MAT_DIALOG_DATA) public data) {
    this.manufacturerService.findByIdImportBill(data.id).subscribe(importBill => {
      this.importBill = importBill;
    });
  }

  ngOnInit(): void {
  }

}
