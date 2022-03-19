import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomerListComponent} from "./customer/customer-list/customer-list.component";
// import {ExportBillRefundComponent} from './export-bill-management/export-bill-refund/export-bill-refund.component';


const routes: Routes = [
  {
    path: 'drugGroup',
    loadChildren: () => import('./drug-group/drug-group-routing.module').then(module => module.DrugGroupRoutingModule)
  },
  {
    path: "customer-list",component: CustomerListComponent
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(module => module.AccountModule)
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementInformationRoutingModule { }
