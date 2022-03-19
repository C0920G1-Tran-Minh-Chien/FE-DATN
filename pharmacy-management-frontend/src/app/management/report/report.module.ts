import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReportRoutingModule} from './report-routing.module';
import {ReportComponent} from './report-detail/report.component';
import {FormsModule} from '@angular/forms';
import {StatisticalChartComponent} from './statistical-chart/statistical-chart.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NgApexchartsModule} from 'ng-apexcharts';

@NgModule({
  declarations: [ReportComponent, StatisticalChartComponent],
    imports: [
        CommonModule,
        ReportRoutingModule,
        FormsModule,
        NgApexchartsModule,
        MatTabsModule,
        MatProgressSpinnerModule
    ]
})
export class ReportModule {
}
