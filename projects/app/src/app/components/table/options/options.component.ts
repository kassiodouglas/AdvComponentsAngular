import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  @Input() data:any

  constructor() { }

  ngOnInit() {

    console.log("Prop 'data' no component options: ", this.data)
  }

}
