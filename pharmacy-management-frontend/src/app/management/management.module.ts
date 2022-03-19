import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementRoutingModule } from './management-routing.module';
import { PrescriptionListComponent } from './prescription-indicative/prescription/prescription-list/prescription-list.component';
import { PrescriptionCreateComponent } from './prescription-indicative/prescription/prescription-create/prescription-create.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxPrintModule} from "ngx-print";
@NgModule({
  declarations: [],
  exports: [
  ],

    imports: [
        CommonModule,
        ManagementRoutingModule,
        ReactiveFormsModule,
        NgxPrintModule,
    ]
})
export class ManagementModule { }
