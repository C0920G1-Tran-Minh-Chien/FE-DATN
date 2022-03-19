import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListEmployeeComponent} from './list-employee/list-employee.component';
import {EmployeeCreateComponent} from './employee-create/employee-create.component';


const routes: Routes = [
  {path: '', component: ListEmployeeComponent},
  {path: 'create', component: EmployeeCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
