import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../usuario.service';
import { AppHeaderModule } from 'src/app/app-header/app-header.module';
import { Usuario } from '../usuario';


@Component({
  selector: 'app-usuario-editdata',
  templateUrl: './usuario-editdata.component.html',
  styleUrls: ['./usuario-editdata.component.css']
})
export class UsuarioEditDataComponent implements OnInit {

  helper = new JwtHelperService();
  usuarioForm: FormGroup;
  userId: number;
  token: string;

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private router1: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private routerPath: Router
  ) { }

  ngOnInit() {
    console.log("entro al form edit data")
    if (!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      console.log("entro al ELSE form edit data")
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      console.log(this.userId)
      console.log(this.token)
      this.usuarioService.getUsuario(parseInt(this.router.snapshot.params.userId), this.token)
        .subscribe(usuario => {
          this.userId = usuario.id
          this.usuarioForm = this.formBuilder.group({
            nombre: [usuario.nombre, [Validators.required, Validators.maxLength(50)]],
            apellido: [usuario.apellido, [Validators.required, Validators.maxLength(50)]],
            telefono: [usuario.telefono, [Validators.required, Validators.maxLength(12)]],
            email: [usuario.email, [Validators.required, Validators.maxLength(50), Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
            genero: [usuario.genero,  [Validators.required, Validators.maxLength(50)]],
            direccion: [usuario.direccion, [Validators.required, Validators.maxLength(80)]]
          })

        })
    }

    // this.usuarioForm = this.formBuilder.group({
    //   nombre: ["", [Validators.required, Validators.maxLength(50)]],
    //   apellido: ["", [Validators.required, Validators.maxLength(50)]],
    //   cedula: ["", [Validators.required, Validators.maxLength(25)]],
    //   telefono: ["", [Validators.required, Validators.maxLength(12)]],
    //   email: ["", [Validators.required, Validators.maxLength(50), Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
    //   genero: ["", [Validators.required, Validators.maxLength(50)]],
    //   direccion: ["", [Validators.required, Validators.maxLength(80)]],
    //   usuario: ["", [Validators.required, Validators.maxLength(50)]],
    //   password: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
    //   confirmPassword: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]]
    // })

  }

  // editarUsuario1(newUsuario: Usuario) {
  //   this.usuarioService.validateCedula(this.usuarioForm.get('cedula')?.value)
  //     .subscribe(res => {
  //       console.log();
  //       if (res.Existe == 0) {
  //         this.usuarioService.userEditData(this.usuarioForm.get('usuario')?.value, this.usuarioForm.get('password')?.value, this.usuarioForm.get('nombre')?.value, this.usuarioForm.get('apellido')?.value,
  //         this.usuarioForm.get('cedula')?.value, this.usuarioForm.get('telefono')?.value, this.usuarioForm.get('email')?.value, this.usuarioForm.get('genero')?.value, this.usuarioForm.get('direccion')?.value)
  //       .subscribe(res => {
  //         const decodedToken = this.helper.decodeToken(res.token);
  //         this.router1.navigate([`/carreras/${decodedToken.sub}/${res.token}`])
  //         this.showSuccess()
  //       },
  //         error => {
  //           this.showError(`Ha ocurrido un error: ${error.message}`)
  //         })
  //       }else{
  //         this.showError(`Su cedula ya se encuentra registrada`)
  //       }
  //     },
  //       error => {
  //         this.showError(`Ha ocurrido un error: ${error.message}`)
  //       })
  //   /**/
  // }


  editarUsuario(newUsuario: Usuario) {
    this.usuarioService.userEditData(this.token, this.userId, newUsuario)
      .subscribe(usuario => {
        this.showSuccess(usuario)
        this.usuarioForm.reset()
        this.routerPath.navigate([`/carreras/${this.userId}/${this.token}`])
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

  showSuccess(usuario: Usuario) {
    this.toastr.success(`El usuario ${usuario.nombre}, ${usuario.apellido} se ha actualizado exitosamente`, "Actualización exitosa");
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }

}
