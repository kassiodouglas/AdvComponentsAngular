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

import { RouterModule } from '@angular/router';
// import { LayoutHomeComponent } from './components/home/layout.component';
import { HomeComponent } from './components/home/home.component';
import { TopbarComponent } from './components/@layouts/topbar/topbar.component';
import { TableComponent } from './components/tableadv/table/table.component';
import { LayoutSidebarComponent } from './components/sidebaradv/left/layout.component';
import { LeftComponent } from './components/sidebaradv/left/left.component';
import { LayoutSidebarRightComponent } from './components/sidebaradv/right/layout.component';
import { RightComponent } from './components/sidebaradv/right/right.component';
import { LayoutSidebarHoverComponent } from './components/sidebaradv/hover/layout.component';
import { HoverComponent } from './components/sidebaradv/hover/hover.component';
import { LayoutSidebarButtonComponent } from './components/sidebaradv/button/layout.component';
import { LayoutSidebarWithtopbarComponent } from './components/sidebaradv/withtopbar/layout.component';
import { WithtopbarComponent } from './components/sidebaradv/withtopbar/withtopbar.component';
import { ButtonComponent } from './components/sidebaradv/button/button.component';
import { LayoutComponent } from './components/@layouts/layout.component';
import { HeaderComponent } from './components/@layouts/header/header.component';




const routes: Routes = [
  {
    path: "", component: LayoutComponent,
    children: [
      { path: "", component: HomeComponent },
      { path: "componentes/tableadv", component: TableComponent },
    ]
  },

  {
    path: "componentes/sidebar", component: LayoutSidebarComponent,
    children: [
      { path: "esquerdo", component: LeftComponent },
    ]
  },

  {
    path: "componentes/sidebar", component: LayoutSidebarRightComponent,
    children: [
      { path: "direito", component: RightComponent },
    ]
  },

  {
    path: "componentes/sidebar", component: LayoutSidebarHoverComponent,
    children: [
      { path: "hover", component: HoverComponent },
    ]
  },

  {
    path: "componentes/sidebar", component: LayoutSidebarButtonComponent,
    children: [
      { path: "botao", component: ButtonComponent },
    ]
  },

  {
    path: "componentes/sidebar", component: LayoutSidebarWithtopbarComponent,
    children: [
      { path: "topbar", component: WithtopbarComponent },
    ]
  },

]





@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    TopbarComponent,
    LayoutSidebarComponent,
    LayoutSidebarRightComponent,    
    RightComponent, 
    LayoutSidebarHoverComponent,
    LayoutSidebarButtonComponent,
    LayoutSidebarWithtopbarComponent, 
    TableComponent, 
    HeaderComponent
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
