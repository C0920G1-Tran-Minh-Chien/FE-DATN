import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { DrugDetailsComponent } from './drug-details/drug-details.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SearchPageComponent } from './search-page/search-page.component';
import {GroupComponent} from './view-by-drug-group/group.component';
import {LocationComponent} from './location/location.component';
import {HealthTipsComponent} from './health-tips/health-tips.component';
import {HotDealsComponent} from './hot-deals/hot-deals.component';


const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'search/:search', component: SearchPageComponent},
  {path: 'details/:id', component: DrugDetailsComponent},
  {path: 'cart', component: CartComponent},
  {path: 'drug-view-by-drug-group/:drugGroupName', component: GroupComponent},
  {path: 'location', component: LocationComponent},
  {path: 'health-tips', component: HealthTipsComponent},
  {path: 'hot-deals', component: HotDealsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
