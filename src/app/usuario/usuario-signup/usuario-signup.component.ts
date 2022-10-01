import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../usuario.service';



@Component({
  selector: 'app-usuario-signup',
  templateUrl: './usuario-signup.component.html',
  styleUrls: ['./usuario-signup.component.css']
})
export class UsuarioSignupComponent implements OnInit {

  helper = new JwtHelperService();
  usuarioForm: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.usuarioForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.maxLength(50)]],
      apellido: ["", [Validators.required, Validators.maxLength(50)]],
      cedula: ["", [Validators.required, Validators.maxLength(25)]],
      telefono: ["", [Validators.required, Validators.maxLength(12)]],
      email: ["", [Validators.required, Validators.maxLength(50), Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      genero: ["", [Validators.required, Validators.maxLength(50)]],
      direccion: ["", [Validators.required, Validators.maxLength(80)]],
      usuario: ["", [Validators.required, Validators.maxLength(50)]],
      password: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      confirmPassword: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]]
    })
    
  }

  registrarUsuario() {
    
      this.usuarioService.userSignUp(this.usuarioForm.get('usuario')?.value, this.usuarioForm.get('password')?.value, this.usuarioForm.get('nombre')?.value, this.usuarioForm.get('apellido')?.value, 
      this.usuarioForm.get('cedula')?.value, this.usuarioForm.get('telefono')?.value, this.usuarioForm.get('email')?.value, this.usuarioForm.get('genero')?.value, this.usuarioForm.get('direccion')?.value)
    .subscribe(res => {
      const decodedToken = this.helper.decodeToken(res.token);
      this.router.navigate([`/videos/${decodedToken.sub}/${res.token}`])
      this.showSuccess()
    },
      error => {
        this.showError(`Ha ocurrido un error: ${error.message}`)
      })
    /**/
  }

  showError(error: string) {
    this.toastr.error(error, "Error")
  }

  showSuccess() {
    this.toastr.success(`Se ha registrado exitosamente`, "Registro exitoso");
  }

}
