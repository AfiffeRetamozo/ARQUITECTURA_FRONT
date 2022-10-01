import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaccion } from './transaccion';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {
  private backUrl: string = "http://127.0.0.1:5000/"

  constructor(private http: HttpClient) { }


  transaccionCreate(token: string, transaccion: Transaccion): Observable<any> {
    console.log(JSON.stringify(transaccion))
    console.log(JSON.stringify(token))
    
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
      return this.http.post<any>(`${this.backUrl}/transacciones`, transaccion, { headers: headers })
    }
}
