import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomerAuthService} from "../service/customer-auth.service";

const routes: Routes = [

  {
    path: 'common',
    loadChildren: () => import('./common/common.module').then(module => module.CommonModule)
  },
  {
    path: 'warehouse',  canActivate : [CustomerAuthService],
    loadChildren: () => import('./warehouse/warehouse.module').then(module => module.WarehouseModule)
  },
  {
    path: 'management-information',  canActivate : [CustomerAuthService],
    loadChildren: () => import('./management-information/management-information.module').then(module => module.ManagementInformationModule)
  },
  {
    path: 'report',  canActivate : [CustomerAuthService],
    loadChildren: () => import('./report/report.module').then(module => module.ReportModule)
  },
  {
    path: 'information-lookup',  canActivate : [CustomerAuthService],
    loadChildren: () => import('./information-lookup/information-lookup.module').then(module => module.InformationLookupModule)
  }, {
  path : 'manufacturer',  canActivate : [CustomerAuthService],
  loadChildren: () => import('./manufacturer/manufacturer.module').then(module => module.ManufacturerModule)
},
  {
    path: 'wholesale',  canActivate : [CustomerAuthService],
    loadChildren: () => import('./wholesale/wholesale.module').then(module => module.WholesaleModule)
  },
  {
    path: 'prescription',  canActivate : [CustomerAuthService],
    loadChildren: () => import('./prescription-indicative/prescription/prescription.module').then(module => module.PrescriptionModule)
  },
  {
    path: 'indicative',  canActivate : [CustomerAuthService],
    loadChildren: () => import('./prescription-indicative/indicative/indicative.module').then(module => module.IndicativeModule)
  },
  {
    path: 'employee', canActivate : [CustomerAuthService],
    loadChildren: () => import('./employee/employee.module').then(module => module.EmployeeModule)
  },
  {
    path: "customer",  canActivate : [CustomerAuthService],
    loadChildren: () => import('./management-information/management-information.module').then(module => module.ManagementInformationModule)
  },
  {
    path: "sale-retail",  canActivate : [CustomerAuthService],
    loadChildren: () => import('./sale-retail/sale-retail.module').then(module => module.SaleRetailModule)
  },
  {
    path: 'sales', canActivate : [CustomerAuthService],
    loadChildren: () => import('./sales-invoice-management/sales-invoice-management-routing.module').then(module => module.SalesInvoiceManagementRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
