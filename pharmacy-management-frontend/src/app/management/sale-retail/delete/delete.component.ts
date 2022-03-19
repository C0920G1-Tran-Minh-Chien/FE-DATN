import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PrescriptionComponent} from '../prescription/prescription.component';
import {Indicative} from '../../../model/indicative';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  drugOfBills: Indicative[] = [];

  // @ts-ignore
  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    console.log(data[1].id);
  }

  ngOnInit(): void {
  }

  delete() {
    for (let i = 0 ; i < this.data[0].length ; i++) {
      if (this.data[0][i] === this.data[1]) {
        this.data[0].splice(i  , 1);
      }
    }
    console.log(this.data[0]);
  }

}
