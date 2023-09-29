import { Component } from '@angular/core';
import { SpotsService } from './services/spots.service';
import { OptionsComponent } from './components/options/options.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  
  gridDataSpots:any|null = null
  gridDataUsers:any|null = null


  //props:    
    // db: 'nome da coluna no banco', 
    // label: 'texto a ser exibido no header',
    // width: 'comprimento personalizado' 

    //order (na tabela ): {db: 'identificador da coluna que será ordenada'} | {db:'identificador da coluna que será ordenada', table_primary:"nome ta table primaria", table_secondary:"nome ta table secundaria", field_secondary:"campo na tablea secundaria", field_inner_primary:"campo na tabela primaria que faz o inner com a secundaria"}
  gridHeaderSpots = [
      { 
        db: 'branch.name', label: 'Unidade', 
        search: {model:"branch", field:"name"}, 
        order: {db:'branch.name', table_primary:"spots", table_secondary:"branches", field_secondary:"name", field_inner_primary:"branch_id"}
      },
      
      { 
        db: 'name', label: 'Vaga',
        search: "name",
        order: {db:'name'} 
      },
      
      { 
        db: 'status.name', label: 'Status',  
        search: {model:"status", field:"name"}, 
        order: {db:'status.name',table_primary:"spots",table_secondary:"spot_status",field_secondary:"name",field_inner_primary:"status_id"},
      },
     
      { 
        db: 'sector.name', label: 'Setor',  
        search: {model:"sector", field:"name"}, 
        order: {db:'sector.name',table_primary:"spots",table_secondary:"spot_sectors",field_secondary:"name",field_inner_primary:"sector_id"}
      },

      { 
        db: 'options', label: 'Opções',  
      },
  ]

  gridHeaderUsers = [
    { 
      db: 'name', label: 'Nome', 
      search: "name", 
      order: {db:'name'}
    }, 
    { 
      db: 'email', label: 'Email', 
      search: 'email', 
      order: {db:'email'}
    },  

    { 
      db: 'options', label: 'Opções',  
    },
]

  constructor(
    private spotsService: SpotsService
  ){}


  getData(e:any){

    if(e.id =='tableSpots'){
      this.spotsService.spots(e).subscribe({
        next: (response)=>{

          if(response.error){     
            this.gridDataSpots = null
            return
          }

          response.data.forEach((item:any) => {      
            item['options'] = { component: { instance: OptionsComponent, properties: { spot: item } } }
          });

          this.gridDataSpots = response
        },
        error: (err)=>{
          this.gridDataSpots = null
          console.error(err)
        }
      })
    }
  }

  getDataUsers(e:any){

    if(e.id =='tableUsers'){
      this.spotsService.users(e).subscribe({
        next: (response)=>{

          if(response.error){     
            this.gridDataUsers = null
            return
          }

          response.data.forEach((item:any) => {      
            item['options'] = { component: { instance: OptionsComponent, properties: { spot: item } } }
          });

          this.gridDataUsers = response
        },
        error: (err)=>{
          this.gridDataUsers = null
          console.error(err)
        }
      })
    }
  }

}
