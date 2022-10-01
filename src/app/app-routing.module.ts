import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApostadorEditComponent } from './apostador/apostador-edit/apostador-edit.component';
import { CarreraCreateComponent } from './carrera/carrera-create/carrera-create.component';
import { CarreraEditComponent } from './carrera/carrera-edit/carrera-edit.component';
import { CarreraFinishComponent } from './carrera/carrera-finish/carrera-finish.component';
import { CarreraListComponent } from './carrera/carrera-list/carrera-list.component';
import { CarreraReportComponent } from './carrera/carrera-report/carrera-report.component';
import { UsuarioLoginComponent } from './usuario/usuario-login/usuario-login.component';
import { UsuarioSignupComponent } from './usuario/usuario-signup/usuario-signup.component';
import { UsuarioEditDataComponent } from './usuario/usuario-editdata/usuario-editdata.component';
import { TransaccionCreateComponent } from './transacciones/transaccion-create/transaccion-create.component';
import { TransaccionDetailComponent } from './transacciones/transaccion-detail/transaccion-detail.component';



const routes: Routes = [
  {
    path: '',
    component: UsuarioLoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'signin',
    component: UsuarioLoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: UsuarioSignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'videos/:userId/:userToken',
    component: CarreraListComponent
  },
  {
    path: 'transacciones/:userId/:userToken',
    component: TransaccionDetailComponent
  }

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
