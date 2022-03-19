import {Component, Inject, OnInit} from '@angular/core';
import {DrugOfBill} from '../../../model/drug-of-bill';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
  }

  delete() {
    for (let i = 0 ; i < this.data[0].length ; i++) {
      if (this.data[0][i] === this.data[1].drugOfBill) {
        this.data[0].splice(i  , 1);
      }
    }
  }
}
