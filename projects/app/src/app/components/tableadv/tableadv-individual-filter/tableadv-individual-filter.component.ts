import { Component } from '@angular/core';

import { TableadvIndividualFilterService } from '../../../services/tableadv-individual-filter.service'

@Component({
  selector: 'app-tableadv-individual-filter',
  templateUrl: './tableadv-individual-filter.component.html',
  styleUrls: ['./tableadv-individual-filter.component.scss']
})
export class TableadvIndividualFilterComponent {

  gridData:any = []
  gridHeader =  [

    {
      db: "options", label: "",
      width: '50px'
    },

    {
      db: "cod_master",
      label: "Cod Mestre",
      search: "cod_master",
      order: { db: "cod_master" },
      individualfilter: true
    },

    {
      db: "name", label: "Nome", order: { db: "name" }, search: "name", individualfilter: true
    },

    {
      db: "category.name", label: "Categoria", order: { db: "category.name" }, search: {model:'category',field:'name'}, individualfilter: true
    },

    {
      db: "group.name", label: "Grupo", order: { db: "group.name" }, search: {model:'group',field:'name'}, individualfilter: true
    }

  ]


  constructor(
    private IndividualFilterService: TableadvIndividualFilterService
  ){}

  getData(event:any){
    this.IndividualFilterService.getDataList(event).subscribe({
      next: (DataList: any) => {
      //   DataList.data.array.forEach((item:any) => {
      //     item['options'] = 1
      //   });
        this.gridData = DataList
      }
    })

    // this.gridData = this.IndividualFilterService.getDataList(event)
    // console.log(this.gridData)
  }

}
