import {Component, Inject, Input, OnInit} from '@angular/core';
import {Payment} from '../../../../model/payment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ManufacturerService} from '../../../../service/manufacturer.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-warehouse-import-payment',
  templateUrl: './warehouse-import-payment.component.html',
  styleUrls: ['./warehouse-import-payment.component.css']
})
export class WarehouseImportPaymentComponent implements OnInit {
  paymentForm: FormGroup;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<WarehouseImportPaymentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Payment) {
  }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      paymentId: [this.data.paymentId],
      totalMoney: [this.data.totalMoney, [Validators.required, Validators.min(0)]],
      prepayment: [this.data.prepayment, [Validators.required, Validators.min(0)]],
      discount: [this.data.discount, [Validators.required, Validators.min(0), Validators.max(100)]],
      status: [this.data.status],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    const {value, valid} = this.paymentForm;
    if (valid) {
      this.dialogRef.close(value);
    }
  }
  get cashInReturn() {
    return Math.round(this.paymentForm.get('totalMoney').value - this.paymentForm.get('prepayment').value);
  }

}
