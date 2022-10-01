import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Carrera, Competidor } from 'src/app/carrera/carrera';
import { CarreraService } from 'src/app/carrera/carrera.service';
import { Apostador } from '../apostador';
import { ApostadorService } from '../apostador.service';

@Component({
  selector: 'app-apostador-edit',
  templateUrl: './apostador-edit.component.html',
  styleUrls: ['./apostador-edit.component.css']
})
export class ApostadorEditComponent implements OnInit {

  userId: number;
  token: string;
  apuestaId: number;
  apostadorForm!: FormGroup;
  carreras: Array<Carrera>
  competidores: Array<Competidor>

  constructor(
    private apostadorService: ApostadorService,
    private carreraService: CarreraService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private routerPath: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    if (!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      this.apostadorService.getApostador(this.router.snapshot.params.apuestaId, this.token)
        .subscribe(apostador => {
          this.apuestaId = apostador.id
          this.apostadorForm = this.formBuilder.group({
            id_carrera: [apostador.id_carrera, [Validators.required]],
            id_competidor: [apostador.id_competidor, [Validators.required]],
            nombre_apostador: [apostador.nombre_apostador, [Validators.required, Validators.minLength(1), Validators.maxLength(128)]],
            valor_apostado: [Number(apostador.valor_apostado).toFixed(2), [Validators.required]]
          })
          this.getCarreras(apostador.id_carrera)
        })
    }
  }

  onCarreraSelect(event: any): void {
    if (event != null && event != "") {
      var carreraSeleccionada = this.carreras.filter(x => x.id == event)[0]
      this.competidores = carreraSeleccionada.competidores
    }
  }

  getCarreras(id_carrera: number): void {
    this.carreraService.getCarreras(this.userId, this.token)
      .subscribe(carreras => {
        this.carreras = carreras
        this.onCarreraSelect(id_carrera)
      },
        error => {
          console.log(error)
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

  cancelCreate() {
    this.apostadorForm.reset()
    this.routerPath.navigate([`/apuestas/${this.userId}/${this.token}`])
  }

  editarApostador(newApostador: Apostador) {
    this.apostadorService.editarApostador(newApostador, this.apuestaId, this.token)
      .subscribe(apostador => {
        this.showSuccess(apostador)
        this.apostadorForm.reset()
        this.routerPath.navigate([`/apostadores/${this.userId}/${this.token}`])
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

  showError(error: string) {
    this.toastr.error(error, "Error")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }

  showSuccess(apostador: Apostador) {
    this.toastr.success(`El apostador ${apostador.id} fue editad0`, "Edición exitosa");
  }

}
