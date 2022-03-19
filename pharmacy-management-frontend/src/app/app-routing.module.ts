import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomerAuthService} from "./service/customer-auth.service";


const routes: Routes = [
  {
    path: 'management', canActivate : [CustomerAuthService],
    loadChildren: () => import('./management/management.module').then(module => module.ManagementModule)
  },
  {
    path: '',
    loadChildren: () => import('./client/client.module').then(module => module.ClientModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(module => module.UserModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
