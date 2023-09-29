import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotsService {

  urlApi = "http://local.gestao-economico-estacionamento-backend/api"

  token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWwuZ2VzdGFvLWVjb25vbWljby1lc3RhY2lvbmFtZW50by1iYWNrZW5kL2FwaS9hdXRoIiwiaWF0IjoxNjk1ODk0ODE3LCJleHAiOjE2OTYxMTA4MTcsIm5iZiI6MTY5NTg5NDgxNywianRpIjoiNmpUbXdnMHN3U1YwNDBiNyIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.POqmdOwO5qvs1bUp1Ai90m2Ja5PC4I9j4XilubizRLE"
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

  spots(e: any): Observable<any> {
    let url = `${this.urlApi}/spots`
    return this.http.post<any>(url, e, this.options())
  }

  users(e: any): Observable<any> {
    let url = `${this.urlApi}/users`
    return this.http.post<any>(url, e, this.options())
  }

}
