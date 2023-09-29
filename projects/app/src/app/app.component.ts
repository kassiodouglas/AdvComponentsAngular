import { Component } from '@angular/core';
import { Service } from './services/service.service';
import { OptionsComponent } from './components/options/options.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 

  gridDataUsers:any|null = null 

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
    private service: Service
  ){}


  getDataUsers(e:any){

    if(e.id =='tableUsers'){
      this.service.users(e).subscribe({
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
