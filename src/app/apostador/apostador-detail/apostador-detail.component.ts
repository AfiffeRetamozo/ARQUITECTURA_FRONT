import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Apostador } from '../apostador';
import { ApostadorService } from '../apostador.service';

@Component({
  selector: 'app-apostador-detail',
  templateUrl: './apostador-detail.component.html',
  styleUrls: ['./apostador-detail.component.css']
})
export class ApostadorDetailComponent implements OnInit {

  @Input() carrera: string;
  @Input() competidor: string;
  @Input() inputApostador: Apostador;

  userId: number;
  token: string;

  constructor(
    private apostadorService: ApostadorService,
    private router: ActivatedRoute,
    private routerPath: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.userId = parseInt(this.router.snapshot.params.userId)
    this.token = this.router.snapshot.params.userToken
  }

  eliminarApostador() {
    this.apostadorService.eliminarApostador(this.inputApostador.id, this.token)
      .subscribe(respuesta => {
        this.showSuccess()
        window.location.reload()
      },
        error => {
          this.showError("Ha ocurrido un error. " + error.message)
        })
  }

  goToEdit() {
    this.routerPath.navigate([`/apostadores/editar/${this.inputApostador.id}/${this.userId}/${this.token}`])
  }

  showError(error: string) {
    this.toastr.error(error, "Error de autenticación")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }

  showSuccess() {
    this.toastr.success(`La carrera fue eliminada`, "Eliminada exitosamente");
  }
}
