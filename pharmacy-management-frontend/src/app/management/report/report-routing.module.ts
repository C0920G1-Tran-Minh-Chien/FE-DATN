import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ReportComponent} from './report-detail/report.component';
import {StatisticalChartComponent} from './statistical-chart/statistical-chart.component';


const routes: Routes = [
  {
    path: '',
    component: ReportComponent
  },
  {
    path: 'chart',
    component: StatisticalChartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule {
}
