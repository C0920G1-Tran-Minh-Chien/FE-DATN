import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleRetailRoutingModule } from './sale-retail-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SaleComponent } from './sale/sale.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { PrescriptionDetailComponent } from './prescription-detail/prescription-detail.component';
import { DeleteComponent } from './delete/delete.component';
import {MatDialogModule} from '@angular/material/dialog';
import {NgxPrintModule} from 'ngx-print';
import { PresComponent } from './pres/pres.component';
import {WarehouseExportModule} from "../warehouse/warehouse-export/warehouse-export.module";




@NgModule({
  declarations: [ SaleComponent, PrescriptionComponent, PrescriptionDetailComponent, DeleteComponent, PresComponent],
  exports: [
  ],
    imports: [
        CommonModule,
        SaleRetailRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        NgxPrintModule,
        WarehouseExportModule
    ]
})
export class SaleRetailModule { }
