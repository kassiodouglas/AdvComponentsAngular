import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Service } from './services/service.service';
import { HttpClientModule } from '@angular/common/http' 
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

import { TableAdvModule } from '@kassdoug/tableadv';
import { SidebaradvModule } from '@kassdoug/sidebaradv';
import {  RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {
      path:"", component: LayoutComponent, 
      children:[
        { path:"", component: HomeComponent},  
        { path:"app", component: HomeComponent},  
    ]
  }
]


@NgModule({
  declarations: [
    AppComponent, LayoutComponent, HomeComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    TableAdvModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule, 
    CommonModule,
    SidebaradvModule
  ],
  providers: [Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
