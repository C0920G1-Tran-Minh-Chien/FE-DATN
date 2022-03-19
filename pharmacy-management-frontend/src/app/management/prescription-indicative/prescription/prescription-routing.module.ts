import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PrescriptionListComponent} from './prescription-list/prescription-list.component';
import {PrescriptionCreateComponent} from './prescription-create/prescription-create.component';
import {PrescriptionEditComponent} from './prescription-edit/prescription-edit.component';



const routes: Routes = [
  {
    path: 'prescription-list',
    component: PrescriptionListComponent
  },
  {
    path: 'prescription-create',
    component: PrescriptionCreateComponent
  },
  {
    path: 'prescription-edit/:id',
    component: PrescriptionEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrescriptionRoutingModule {
}
