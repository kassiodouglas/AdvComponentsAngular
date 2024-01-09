import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Service {

  private readonly API = "http://127.0.0.1:8000/api/products"
  private readonly token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2F1dGgiLCJpYXQiOjE3MDQ4MDMzNjksImV4cCI6MTcwNTAxOTM2OSwibmJmIjoxNzA0ODAzMzY5LCJqdGkiOiJZUmJrTjB3cFVBUnlNbEc4Iiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.i1Ca2U_MgIheosqT-AYAzG2E5BG3QYhgGrcKO_6eX0k"

  constructor( private http: HttpClient ) { }

  /** Links da sidebar */
  sidebarlinks() {
    return [
      {
        path: '/',
        label: 'Home',
        icon: '<i class="fa-solid fa-house"></i>',
        permissions: ['home'],
        tags: ['home', 'inicio'],
      },

      {
        id: 'components',
        label: 'Componentes',       
        icon:'<i class="fa-solid fa-boxes-packing"></i>',
        permissions: ['home'],
        links:[
          {
            path: '/sidebar',
            label: 'Sidebar',
            icon: '<i class="fa-solid fa-bars"></i>',
            tags: ['sidebar', 'barra lateral'],
          },
    
          {
            path: '/table',
            label: 'Table',
            icon: '<i class="fa-solid fa-table"></i>',
            tags: ['table', 'tableadv'],
          },
        ]
      },




    ];
  }

  /** Cabeçalho de requisição */
  options() {
    return {
        headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('accept', 'application/json')
            .set('Authorization', `Bearer ${this.token}`)
    }
  }

  /** Rota que retorna os dados para a tableadv */
  getProducts(e: any): Observable<Array<any>>{
    return this.http.post<Array<any>>(this.API,e, this.options())
  }
}
