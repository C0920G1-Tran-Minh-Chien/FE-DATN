import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrugGroupRoutingModule } from './drug-group-routing.module';
import {DrugGroupListComponent} from './drug-group-list/drug-group-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DrugGroupDeleteComponent} from "./drug-group-delete/drug-group-delete.component";


@NgModule({
  declarations: [DrugGroupListComponent,DrugGroupDeleteComponent],
    imports: [
        CommonModule,
        DrugGroupRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class DrugGroupModule { }
