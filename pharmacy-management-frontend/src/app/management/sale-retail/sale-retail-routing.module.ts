import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SaleComponent} from './sale/sale.component';
import {PrescriptionComponent} from './prescription/prescription.component';
import {PrescriptionDetailComponent} from './prescription-detail/prescription-detail.component';
import {PresComponent} from "./pres/pres.component";

const routes: Routes = [
  {path: 'sale' , component: SaleComponent},
  {path: 'pres', component: PresComponent },
  {path: 'prescription-detail/:id', component: PrescriptionDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRetailRoutingModule { }
