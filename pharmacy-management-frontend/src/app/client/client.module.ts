import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClientRoutingModule} from './client-routing.module';
import {HomepageComponent} from './homepage/homepage.component';
import {SearchPageComponent} from './search-page/search-page.component';
import {CartComponent} from './cart/cart.component';
import {DrugDetailsComponent} from './drug-details/drug-details.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderClientComponent} from './header-client/header-client.component';
import {FooterClientComponent} from './footer-client/footer-client.component';
import {GroupComponent} from './view-by-drug-group/group.component';
import { LocationComponent } from './location/location.component';
import { HealthTipsComponent } from './health-tips/health-tips.component';
import { HotDealsComponent } from './hot-deals/hot-deals.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ZaloPayComponent } from './zalo-pay/zalo-pay.component';



@NgModule({
  declarations: [
    HomepageComponent, SearchPageComponent, CartComponent, DrugDetailsComponent,
     HeaderClientComponent, FooterClientComponent, GroupComponent,
    LocationComponent, HealthTipsComponent, HotDealsComponent, ZaloPayComponent
  ],
  exports: [
    HeaderClientComponent,
    FooterClientComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class ClientModule { }
