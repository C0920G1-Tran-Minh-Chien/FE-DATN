import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndicativeRoutingModule } from './indicative-routing.module';
import {IndicativeCreateComponent} from './indicative-create/indicative-create.component';
import {IndicativeDeleteComponent} from './indicative-delete/indicative-delete.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IndicativeListComponent } from './indicative-list/indicative-list.component';


@NgModule({
  declarations: [IndicativeCreateComponent, IndicativeDeleteComponent, IndicativeListComponent],
  exports: [
    IndicativeListComponent,
    IndicativeCreateComponent
  ],
  imports: [
    CommonModule,
    IndicativeRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class IndicativeModule { }
