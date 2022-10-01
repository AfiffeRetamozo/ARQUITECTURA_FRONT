import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    private backUrl: string = "http://127.0.0.1:5000/"

    constructor(private http: HttpClient) { }


    userLogIn(usuario: string, contrasena: string): Observable<any> {
        return this.http.post<any>(`${this.backUrl}/login`, { "usuario": usuario, "contrasena": contrasena });
    }

    userSignUp(usuario: string, contrasena: string, nombre: string, apellido: string, cedula: number, telefono: number, email: string, genero: string, direccion: string ): Observable<any> {
        return this.http.post<any>(`${this.backUrl}/signin`, { "usuario": usuario, "contrasena": contrasena, "nombre": nombre, "apellido": apellido, "cedula": cedula, "telefono": telefono, "email": email, "genero": genero, "direccion": direccion})
    }

    userEditData(token: string, idUsuario: number, usuario: Usuario ): Observable<any> {
        //return this.http.post<any>(`${this.backUrl}/usuario`, { "nombre": usuario.nombre, "apellido": usuario.apellido, "telefono": usuario.telefono, "email": usuario.email, "genero": usuario.genero, "direccion": usuario.direccion})
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        })
        return this.http.put<Usuario>(`${this.backUrl}/usuario/${idUsuario}`, usuario, { headers: headers })
    }


    getApostadores(usuario: number, token: string): Observable<Usuario[]> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
      return this.http.get<Usuario[]>(`${this.backUrl}/apostadores`, { headers: headers })
    }

    validateCedula(cedula: string): Observable<any> {
        return this.http.get<any>(`${this.backUrl}/validateuser/${cedula}`)
    }

    crearUsuario(usuario: Usuario, token: string): Observable<Usuario> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
      return this.http.post<Usuario>(`${this.backUrl}/usuario`, usuario, { headers: headers })
    }

    getUsuario(usuario: number, token: string): Observable<Usuario> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
      return this.http.get<Usuario>(`${this.backUrl}/usuario/${usuario}`, { headers: headers })
    }
}
