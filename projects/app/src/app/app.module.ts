import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TableAdvModule } from '@kassdoug/tableadv';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpotsService } from './services/spots.service';
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TableAdvModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule, 
    CommonModule
  ],
  providers: [SpotsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
