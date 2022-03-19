import { NgModule } from '@angular/core';

import { CommonRoutingModule } from './common-routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [HomeComponent, NavbarComponent, SidebarComponent, ContentComponent],
    exports: [
        NavbarComponent,
        ContentComponent,
        HomeComponent
    ],
  imports: [
    CommonRoutingModule,
    BrowserAnimationsModule
  ]
})
export class CommonModule { }
