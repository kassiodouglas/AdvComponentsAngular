import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  
  @Input() spot: any|null = null

  constructor() { }

  ngOnInit() {
  }

}
