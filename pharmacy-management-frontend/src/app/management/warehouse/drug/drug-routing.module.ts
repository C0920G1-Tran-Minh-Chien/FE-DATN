import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DrugListComponent} from './drug-list/drug-list.component';
import {DrugCreateComponent} from './drug-create/drug-create.component';
import {DrugEditComponent} from './drug-edit/drug-edit.component';


const routes: Routes = [
  {path: 'drug/list', component: DrugListComponent},
  {path: 'drug/create', component: DrugCreateComponent},
  {path: 'drug/edit', component: DrugEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrugRoutingModule { }
