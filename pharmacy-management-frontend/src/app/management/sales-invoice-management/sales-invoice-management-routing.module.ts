import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SalesInvoiceComponent} from "./sales-invoice/sales-invoice.component";


const routes: Routes = [
  {path: 'sales-invoice' ,component : SalesInvoiceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesInvoiceManagementRoutingModule { }
