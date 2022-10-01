import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Transaccion } from '../transaccion';
import { TransaccionService } from '../transaccion.service';

@Component({
  selector: 'app-transaccion-create',
  templateUrl: './transaccion-create.component.html',
  styleUrls: ['./transaccion-create.component.css']
})
export class TransaccionCreateComponent implements OnInit {

  helper = new JwtHelperService();
  transaccionForm: FormGroup;
  userId: number;
  token: string;

  constructor(
    private transaccionService: TransaccionService,
    private formBuilder: FormBuilder,
    private router1: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private routerPath: Router
  ) { }

  ngOnInit() {
    if (!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      this.transaccionForm = this.formBuilder.group({
        valor_transacion: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        tipo_transaccion: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(128)]]
      });
    }
  }

  enviarTransaccion(newTransaccion: Transaccion) {
    newTransaccion.id_apostador = this.userId;
    this.transaccionService.transaccionCreate(this.token, newTransaccion)
      .subscribe(transaccion => {
        this.showSuccess(transaccion)
        this.transaccionForm.reset()
        this.routerPath.navigate([`/transacciones/${this.userId}/${this.token}`])
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

  get transaccionFormControls() {
    return this.transaccionForm.controls;
  }


  showError(error: string) {
    this.toastr.error(error, "Error")
  }

  showSuccess(transaccion: Transaccion) {
    this.toastr.success(`El transaccion ${transaccion.id}, se ha realizado exitosamente`, "Transaccion exitosa");
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }
}