import { Component, OnInit } from '@angular/core';
import { Service } from '../../services/service.service';
import { OptionsComponent } from '../tableadv/options/options.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  constructor(
    private service: Service
  ) { }



}
