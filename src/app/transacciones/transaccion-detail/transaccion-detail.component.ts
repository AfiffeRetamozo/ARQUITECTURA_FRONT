import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/usuario/usuario.service';

@Component({
  selector: 'app-transaccion-detail',
  templateUrl: './transaccion-detail.component.html',
  styleUrls: ['./transaccion-detail.component.css']
})
export class TransaccionDetailComponent implements OnInit {
  saldo: number;
  helper = new JwtHelperService();
  userId: number;
  token: string;
  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    if (!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      console.log(this.userId)
      console.log(this.token)
      this.usuarioService.getUsuario(parseInt(this.router.snapshot.params.userId), this.token)
        .subscribe(usuario => {
          this.userId = usuario.id;
          this.saldo = usuario.saldo;


        })
    }
  }

  hacerRecarga() {
    const userId = parseInt(this.router.snapshot.params.userId)
    const token = this.router.snapshot.params.userToken
    this.routerPath.navigate([`/transaccionesRecarga/${userId}/${token}`])
  }

  showError(error: string) {
    this.toastr.error(error, "Error")
  }
}
