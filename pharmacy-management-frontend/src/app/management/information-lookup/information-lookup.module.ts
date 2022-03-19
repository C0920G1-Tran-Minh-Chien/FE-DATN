import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InformationLookupRoutingModule} from './information-lookup-routing.module';
import {LookupComponent} from './lookup/lookup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [LookupComponent],
  imports: [
    CommonModule,
    InformationLookupRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class InformationLookupModule { }
