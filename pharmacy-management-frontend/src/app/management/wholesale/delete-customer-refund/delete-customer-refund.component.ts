import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DrugOfBill} from '../../../model/drug-of-bill';

@Component({
  selector: 'app-delete-customer-refund',
  templateUrl: './delete-customer-refund.component.html',
  styleUrls: ['./delete-customer-refund.component.css']
})
export class DeleteCustomerRefundComponent implements OnInit {
  drugOfBill: DrugOfBill;
  drugDelete: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
  }

  delete() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.data[1].length; i++) {
      // console.log('id ' + id);
      // console.log('data id ' + this.data.listDrug[i].drug.drugId);
      if (this.data[1][i] === this.data[0]) {
        this.drugDelete = (this.data[1].splice(i, 1));
      }
    }
    this.data[2].push(this.drugDelete);
  }
}
