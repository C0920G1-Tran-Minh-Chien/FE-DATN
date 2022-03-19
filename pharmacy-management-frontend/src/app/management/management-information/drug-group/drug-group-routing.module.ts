import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DrugGroupListComponent} from './drug-group-list/drug-group-list.component';


const routes: Routes = [
  {
    path: '',
    component: DrugGroupListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrugGroupRoutingModule { }
