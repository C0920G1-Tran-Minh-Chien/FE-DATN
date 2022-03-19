import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ManagementModule} from './management/management.module';
import {CommonModule} from './management/common/common.module';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {HttpClientModule} from '@angular/common/http';
import {DrugModule} from './management/warehouse/drug/drug.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {ManufacturerModule} from './management/manufacturer/manufacturer.module';
import {ToastrModule} from 'ngx-toastr';
import {WarehouseExportModule} from './management/warehouse/warehouse-export/warehouse-export.module';
import {MatSelectModule} from '@angular/material/select';
import {NgxPrintModule} from 'ngx-print';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {Overlay} from '@angular/cdk/overlay';
import localeVi from '@angular/common/locales/vi';
import {DatePipe, registerLocaleData} from '@angular/common';
import {WholesaleModule} from './management/wholesale/wholesale.module';
import {ClientModule} from "./client/client.module";
import {SaleRetailModule} from "./management/sale-retail/sale-retail.module";
import {AccountModule} from "./management/management-information/account/account.module";
import {SalesInvoiceManagementModule} from "./management/sales-invoice-management/sales-invoice-management.module";
import {CustomCurrencyPipe} from "./management/warehouse/warehouse-export/custom-currency.pipe";
import { CustomerAuthComponent } from './service/customer-auth/customer-auth.component';

registerLocaleData(localeVi, 'vi-VN');

@NgModule({
  declarations: [
    AppComponent,
    CustomerAuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WholesaleModule,
    BrowserAnimationsModule,
    ManagementModule,
    CommonModule,
    SaleRetailModule,
    AccountModule,
    HttpClientModule,
    MatDialogModule,
    DrugModule,
    SalesInvoiceManagementModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ManufacturerModule,
    ToastrModule.forRoot({
      timeOut: 2000,
    }),
    HttpClientModule,
    WarehouseExportModule,
    MatSelectModule,
    NgxPrintModule,
    MatSelectModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgxPrintModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
    ClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [MatDialog , Overlay ,DatePipe,CustomCurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
