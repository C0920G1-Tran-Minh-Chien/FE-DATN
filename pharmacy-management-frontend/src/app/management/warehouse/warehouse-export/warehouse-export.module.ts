import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { WarehouseExportRoutingModule } from './warehouse-export-routing.module';
import { ExportBillRefundComponent } from './export-bill-refund/export-bill-refund.component';
import {MatSelectModule} from '@angular/material/select';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {MatDialogModule} from '@angular/material/dialog';
import {CustomCurrencyPipe} from "./custom-currency.pipe";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxPrintModule} from 'ngx-print';
import { DialogComponent } from './dialog/dialog.component';
import {ExportBillPrintComponent} from './export-bill-print/export-bill-print.component';
import {ExportBillListComponent} from './export-bill-list/export-bill-list.component';
import {ExportBillDeleteComponent} from './export-bill-delete/export-bill-delete.component';
import {ExportBillDestroyComponent} from './export-bill-destroy/export-bill-destroy.component';
import { DialogReturnComponent } from './dialog-return/dialog-return.component';


@NgModule({
  declarations: [DialogComponent, CustomCurrencyPipe, ExportBillPrintComponent, ExportBillListComponent, ExportBillDeleteComponent, ExportBillRefundComponent, ExportBillDestroyComponent, DialogReturnComponent],
  imports: [
    CommonModule,
    WarehouseExportRoutingModule,
    MatSelectModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgxPrintModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    NgxMatSelectSearchModule,
  ],

  exports: [
    CustomCurrencyPipe
  ]
})
export class WarehouseExportModule { }
