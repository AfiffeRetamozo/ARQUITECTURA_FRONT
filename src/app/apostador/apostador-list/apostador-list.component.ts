import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarreraService } from 'src/app/carrera/carrera.service';
import { Apostador } from '../apostador';
import { ApostadorService } from '../apostador.service';


@Component({
  selector: 'app-apostador-list',
  templateUrl: './apostador-list.component.html',
  styleUrls: ['./apostador-list.component.css']
})
export class ApostadorListComponent implements OnInit {

  constructor(
    private apostadorService: ApostadorService,
    private carreraService: CarreraService,
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  userId: number
  token: string
  apostadores: Array<Apostador>
  mostrarApostadores: Array<Apostador>
  apostadorSeleccionado: Apostador
  indiceSeleccionado: number = 0
  nombreCarrera: string
  nombreCompetidor: string


  ngOnInit() {
    if (!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      this.getApostadores();
    }
  }

  getApostadores(): void {
    this.apostadorService.getApostadores(this.token)
      .subscribe(apostadores => {
        this.apostadores = apostadores
        this.mostrarApostadores = apostadores
        this.onSelect(this.mostrarApostadores[0], 0)
      })
  }

  onSelect(apostador: Apostador, indice: number) {
    if (apostador != null) {
      this.indiceSeleccionado = indice
      this.apostadorSeleccionado = apostador
      this.getInfo()
    }
  }

  getInfo(): void {
    this.carreraService.getCarrera(this.apostadorSeleccionado.id_carrera, this.token)
      .subscribe(carrera => {
        this.nombreCarrera = carrera.nombre_carrera
        var competidor = carrera.competidores.filter(x => x.id == this.apostadorSeleccionado.id_competidor)[0]
        this.nombreCompetidor = competidor.nombre_competidor
      },
        error => {
          if (error.statusText === "UNAUTHORIZED") {
            this.showWarning("Su sesión ha caducado, por favor vuelva a iniciar sesión.")
          }
          else if (error.statusText === "UNPROCESSABLE ENTITY") {
            this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
          }
          else {
            this.showError("Ha ocurrido un error. " + error.message)
          }
        })
  }

  buscarApostadores(busqueda: string) {
    let apostadoresBusqueda: Array<Apostador> = []
    this.apostadores.map(apostadores => {
      if (apostadores.nombre_apostador.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase())) {
        apostadoresBusqueda.push(apostadores)
      }
    })
    this.mostrarApostadores = apostadoresBusqueda
  }

  irCrearApostador() {
    this.routerPath.navigate([`/apostadores/crear/${this.userId}/${this.token}`])
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }

  showError(error: string) {
    this.toastr.error(error, "Error de autenticación")
  }

  showSuccess() {
    this.toastr.success(`El apostador fue eliminado`, "Eliminado exitosamente");
  }

}
