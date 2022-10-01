import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioLoginComponent } from './usuario-login/usuario-login.component';
import { UsuarioSignupComponent } from './usuario-signup/usuario-signup.component';
import { AppHeaderModule } from '../app-header/app-header.module';
import { UsuarioEditDataComponent } from './usuario-editdata/usuario-editdata.component';


@NgModule({
  declarations: [UsuarioLoginComponent, UsuarioSignupComponent, UsuarioEditDataComponent],
  imports: [
    CommonModule, ReactiveFormsModule, AppHeaderModule, FormsModule
  ],
  exports: [UsuarioLoginComponent, UsuarioSignupComponent, UsuarioEditDataComponent]
})
export class UsuarioModule { }
