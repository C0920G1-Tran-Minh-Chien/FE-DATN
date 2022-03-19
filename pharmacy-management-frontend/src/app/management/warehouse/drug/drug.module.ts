import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrugRoutingModule } from './drug-routing.module';
import { DrugCreateComponent } from './drug-create/drug-create.component';
import { DrugEditComponent } from './drug-edit/drug-edit.component';
import { DrugListComponent } from './drug-list/drug-list.component';

import { ReactiveFormsModule} from '@angular/forms';
import { DrugDeleteComponent } from './drug-delete/drug-delete.component';

import {FormsModule} from '@angular/forms';
import { DrugNotificationComponent } from './drug-notification/drug-notification.component';





@NgModule({

  declarations: [DrugCreateComponent, DrugEditComponent, DrugListComponent, DrugDeleteComponent,DrugNotificationComponent],

  imports: [
    CommonModule,
    DrugRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]

})
export class DrugModule { }
