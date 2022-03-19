
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ExportBillPrintComponent} from './warehouse-export/export-bill-print/export-bill-print.component';
import {ExportBillListComponent} from './warehouse-export/export-bill-list/export-bill-list.component';

const routes: Routes = [
  {
    path: 'import',
    loadChildren: () => import('./warehouse-import/warehouse-import.module').then(module => module.WarehouseImportModule)
  }, {
    path: 'drug',
    loadChildren: () => import('./drug/drug.module').then(module => module.DrugModule)
  },
  {
    path: 'export-bill/export-bill-refund', component: ExportBillListComponent
  },
  {path: 'export-bill/print', component: ExportBillPrintComponent},


  {
    path: 'warehouse-export',
    loadChildren: () => import('./warehouse-export/warehouse-export.module').then(module => module.WarehouseExportModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule {
}
