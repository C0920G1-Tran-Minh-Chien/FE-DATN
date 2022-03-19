import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginRegisterComponent } from './user-component/login-register/login-register.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [LoginRegisterComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
