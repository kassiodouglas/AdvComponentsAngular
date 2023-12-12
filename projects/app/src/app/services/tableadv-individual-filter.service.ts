import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableadvIndividualFilterService {

  private readonly API = "http://127.0.0.1:8000/api/products"
  private readonly token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgiLCJpYXQiOjE3MDIzMTg4MzgsImV4cCI6MTcwMjUzNDgzOCwibmJmIjoxNzAyMzE4ODM4LCJqdGkiOiJ1UHA3MjFIVkd3R0hYQ1QzIiwic3ViIjoiNTAzIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.PQhuUnwaXjxAGdv4NuFtP9IInljQD9KpwnyPlPgNGQE"

  constructor( private http: HttpClient ) { }

  options() {
    return {
        headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('accept', 'application/json')
            .set('Authorization', `Bearer ${this.token}`)
    }
  }

  getDataList(e: any): Observable<any[]>{
    console.log(JSON.stringify(e))
    return this.http.post<any[]>(this.API,e, this.options())
  }


}
