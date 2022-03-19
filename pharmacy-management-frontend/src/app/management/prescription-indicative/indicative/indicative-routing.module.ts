import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndicativeCreateComponent} from './indicative-create/indicative-create.component';
import {IndicativeDeleteComponent} from './indicative-delete/indicative-delete.component';
import {IndicativeListComponent} from './indicative-list/indicative-list.component';


const routes: Routes = [
  {
    path: 'indicative-create',
    component: IndicativeCreateComponent
  },
  {
    path: 'indicative-delete',
    component: IndicativeDeleteComponent
  },
  {
    path: 'indicative-list',
    component: IndicativeListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndicativeRoutingModule { }
