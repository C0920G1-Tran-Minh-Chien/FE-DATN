import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesInvoiceManagementRoutingModule } from './sales-invoice-management-routing.module';
// import { SalesInvoiceComponent } from './sales-invoice/sales-invoice.component';
import { SalesInvoiceDeleteComponent } from './sales-invoice-delete/sales-invoice-delete.component';
import { SalesInvoiceDetailComponent } from './sales-invoice-detail/sales-invoice-detail.component';

import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SalesInvoiceComponent} from "./sales-invoice/sales-invoice.component";
import {NgxPrintModule} from "ngx-print";



@NgModule({
  declarations: [SalesInvoiceComponent, SalesInvoiceDeleteComponent, SalesInvoiceDetailComponent],
  imports: [
    CommonModule,
    SalesInvoiceManagementRoutingModule,
    NgxPrintModule,

    MatDialogModule,
    BrowserAnimationsModule,

    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,


  ]
})
export class SalesInvoiceManagementModule { }
