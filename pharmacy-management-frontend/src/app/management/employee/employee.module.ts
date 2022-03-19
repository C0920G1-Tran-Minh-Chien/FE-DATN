import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import {ListEmployeeComponent, PhonePipe} from './list-employee/list-employee.component';
import { EmployeeDeleteComponent } from './employee-delete/employee-delete.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import { DialogComponent } from './dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [ListEmployeeComponent, EmployeeDeleteComponent, PhonePipe, EmployeeCreateComponent, DialogComponent],
    imports: [
        CommonModule,
        EmployeeRoutingModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        ReactiveFormsModule,
        MatDialogModule
    ]
})
export class EmployeeModule { }
