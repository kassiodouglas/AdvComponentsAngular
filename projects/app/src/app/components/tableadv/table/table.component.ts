import { Component, OnInit } from '@angular/core';
import { Service } from '../../../services/service.service';
import { OptionsComponent } from '../options/options.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  gridDataUsers: any | null = null

  gridHeaderUsers = [
    {
      db: 'plate', label: 'Placa',
      // search: "plate",
      // order: { db: 'plate' }
    },
    {
      db: 'color.description', label: 'Cor',
      // search: 'color',
      // order: { db: 'color' }
    },

    {
      db: 'model.name', label: 'Modelo',
      // search: 'model.name',
      // order: { db: 'model.name' }
    },

    {
      db: 'options', label: 'Opções',
    },
  ]

  anchor(el: HTMLElement) {
    el.scrollIntoView();
  }

  constructor(
    private service:Service
  ) { }

  ngOnInit() {
  }

  getDataUsers(e: any) {

    if (e.id == 'tableUsers') {

      this.gridDataUsers = this.service.users(e)

      this.gridDataUsers.data.forEach((item: any) => {
        item['options'] = { component: { instance: OptionsComponent, properties: { spot: item } } }
      });

      // this.service.users(e).subscribe({
      //   next: (response) => {

      //     if (response.error) {
      //       this.gridDataUsers = null
      //       return
      //     }

      //     response.data.forEach((item: any) => {
      //       item['options'] = { component: { instance: OptionsComponent, properties: { spot: item } } }
      //     });

      //     this.gridDataUsers = response
      //   },
      //   error: (err) => {
      //     this.gridDataUsers = null
      //     console.error(err)
      //   }
      // })
    }
  }

}
