import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementInformationRoutingModule } from './management-information-routing.module';
import {DrugGroupModule} from './drug-group/drug-group.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {CustomerListComponent} from "./customer/customer-list/customer-list.component";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [CustomerListComponent],
    imports: [
        CommonModule,
        ManagementInformationRoutingModule,
        DrugGroupModule,
        FormsModule,
    ]
})
export class ManagementInformationModule { }
