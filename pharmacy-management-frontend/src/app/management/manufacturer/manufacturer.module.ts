import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManufacturerRoutingModule } from './manufacturer-routing.module';
import { ManufacturerListComponent } from './manufacturer-list/manufacturer-list.component';
import { ManufacturerUpdateComponent } from './manufacturer-update/manufacturer-update.component';
import { ManufacturerDeleteComponent } from './manufacturer-delete/manufacturer-delete.component';
import { ManufacturerShowComponent } from './manufacturer-show/manufacturer-show.component';
import {MatDialogModule} from "@angular/material/dialog";
import { ImportBillShowComponent } from './import-bill-show/import-bill-show.component';
import {ManufacturerCreateComponent} from "./manufacturer-create/manufacturer-create.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";





@NgModule({
  declarations: [ManufacturerListComponent, ManufacturerUpdateComponent, ManufacturerDeleteComponent, ManufacturerShowComponent, ImportBillShowComponent, ManufacturerCreateComponent],
  imports: [

    CommonModule,
    ManufacturerRoutingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ManufacturerModule { }
