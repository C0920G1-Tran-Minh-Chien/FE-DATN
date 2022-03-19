import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WholesaleRoutingModule } from './wholesale-routing.module';
import { WholesaleComponent } from './wholesale/wholesale.component';
import { CustomerRefundComponent } from './customer-refund/customer-refund.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {DeleteComponent} from './delete/delete.component';
import { DeleteCustomerRefundComponent } from './delete-customer-refund/delete-customer-refund.component';
import {NgxPrintModule} from 'ngx-print';


@NgModule({
  declarations: [WholesaleComponent, CustomerRefundComponent, DeleteComponent, DeleteCustomerRefundComponent],
  imports: [
    CommonModule,
    WholesaleRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    NgxPrintModule,
  ]
})
export class WholesaleModule {}
