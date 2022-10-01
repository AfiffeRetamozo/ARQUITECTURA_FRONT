export class Usuario {
    id: number;
    usuario: string
    contrasena: string
    nombre: string
    apellido: string
    cedula: string
    telefono: string
    email: string
    genero: string
    direccion: string
    albumes: Array<any>
    saldo: number

    constructor(
        id: number,
        usuario: string,
        contrasena: string,
        nombre: string,
        apellido: string,
        cedula: string,
        telefono: string,
        email: string,
        genero: string,
        direccion: string,
        saldo: number,
        albumes: Array<any>,
    ) {
        this.id = id;
        this.usuario = usuario;
        this.contrasena = contrasena;
        this.nombre = nombre;
        this.apellido = apellido;
        this.cedula = cedula;
        this.telefono = telefono;
        this.email = email;
        this.genero = genero;
        this.direccion = direccion;
        this.saldo = saldo;
        this.albumes = albumes
    }
}
