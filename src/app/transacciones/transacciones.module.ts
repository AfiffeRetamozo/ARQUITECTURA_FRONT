import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransaccionCreateComponent } from './transaccion-create/transaccion-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppHeaderModule } from '../app-header/app-header.module';
import { TransaccionesComponent } from './transacciones.component';
import { TransaccionDetailComponent } from './transaccion-detail/transaccion-detail.component';


@NgModule({
  declarations: [TransaccionesComponent,TransaccionCreateComponent, TransaccionDetailComponent],
  imports: [
    CommonModule, ReactiveFormsModule, AppHeaderModule, FormsModule
  ],
  exports: [TransaccionCreateComponent]
})
export class TransaccionesModule { }
