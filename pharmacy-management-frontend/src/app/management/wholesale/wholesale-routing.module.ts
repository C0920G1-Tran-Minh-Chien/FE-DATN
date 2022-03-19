import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WholesaleComponent} from './wholesale/wholesale.component';
import {CustomerRefundComponent} from './customer-refund/customer-refund.component';


const routes: Routes = [
  {
    path: 'wholesale',
    component: WholesaleComponent
  },
  {
    path: 'customer-refund',
    component: CustomerRefundComponent
  }
  ]
;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WholesaleRoutingModule { }
