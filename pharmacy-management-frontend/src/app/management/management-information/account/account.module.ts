import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountEditComponent } from './account-edit/account-edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DialogComponent } from './dialog/dialog.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  declarations: [AccountListComponent, AccountEditComponent, DialogComponent],
    imports: [
        CommonModule,
        AccountRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule
    ]
})
export class AccountModule { }
