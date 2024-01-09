import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Service } from './services/service.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { TableAdvModule } from '@kassdoug/tableadv';
import { SidebaradvModule } from '@kassdoug/sidebaradv';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TopbarComponent } from './components/@layouts/topbar/topbar.component';
import { LayoutComponent } from './components/@layouts/layout.component';
import { HeaderComponent } from './components/@layouts/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TableComponent } from './components/table/table.component';



const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'sidebar', component: SidebarComponent },
      { path: 'table', component: TableComponent }
    ],
  },
];



@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    TopbarComponent,
    HeaderComponent,
    TableComponent,
    SidebarComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    TableAdvModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    SidebaradvModule,
  ],
  providers: [Service],
  bootstrap: [AppComponent],
})
export class AppModule {}
