import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apostador } from './apostador';

@Injectable({
  providedIn: 'root'
})
export class ApostadorService {

  private backUrl: string = "http://127.0.0.1:5000/"

  constructor(private http: HttpClient) { }

  getApostadores(token: string): Observable<Apostador[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<Apostador[]>(`${this.backUrl}/apostadores`, { headers: headers })
  }

  crearApostador(apostador: Apostador, token: string): Observable<Apostador> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<Apostador>(`${this.backUrl}/apostadores`, apostador, { headers: headers })
  }

  getApostador(apostadorId: number, token: string): Observable<Apostador> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<Apostador>(`${this.backUrl}/apostador/${apostadorId}`, { headers: headers })
  }

  getMisDatosApostador(usuarioId: number, token: string): Observable<Apostador> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<Apostador>(`${this.backUrl}/apostador/${usuarioId}`, { headers: headers })
  }

  editarApostador(apostador: Apostador, apuestaId: number, token: string): Observable<Apostador> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.put<Apostador>(`${this.backUrl}/apostador/${apuestaId}`, apostador, { headers: headers })
  }

  eliminarApostador(apostadorId: number, token: string): Observable<Apostador> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.delete<Apostador>(`${this.backUrl}/apostador/${apostadorId}`, { headers: headers })
  }

}
