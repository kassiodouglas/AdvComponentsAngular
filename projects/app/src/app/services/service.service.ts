import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Service {

  urlApi = "http://localhost:8000/api"
  token = ""

  constructor(
    private http:HttpClient,
  ) { }

  options(){
    return {headers:new HttpHeaders()
      .set('Content-Type','application/json')
      .set('accept','application/json')
      .set('Authorization', `Bearer ${this.token}`)
    }
  }

  users(e: any): Observable<any> {
    let url = `${this.urlApi}/users`
    return this.http.post<any>(url, e, this.options())
  }

}
