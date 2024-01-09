import { Component, OnInit } from '@angular/core';
import { Service } from '../../services/service.service';
import { OptionsComponent } from './options/options.component';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  tableadvUsers:Array<any> = []
  tableadvIdUser:string = 'tableUsers'

  tableadvUsersHeader = [

      {
        db:"options", label:"Opções"
      },
      {
          db:"name", label:"Produto",
          search: "name", order: {db:"name"},
          individualfilter: true
      },

      {
        db:"cod_master", label:"COD",
        search: "cod_master", order: {db:"cod_master"},
        individualfilter: true
    },
      
     
  ]
  constructor(
    private service:Service
  ) { }

  ngOnInit() {
  }


  getDataUsers(event:any){

    if(event.id == this.tableadvIdUser){

        this.service.getProducts(event).subscribe({
            next: (response:any)=>{

                response.data.forEach((item:any) => {      
                    item['options'] = { component: { instance: OptionsComponent, properties: { data: item } } }
                });

                this.tableadvUsers = response
            }
        })

    }

}

}
