import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppHeaderModule } from '../app-header/app-header.module';
import { ApostadorCreateComponent } from './apostador-create/apostador-create.component';
import { ApostadorDetailComponent } from './apostador-detail/apostador-detail.component';
import { ApostadorEditComponent } from './apostador-edit/apostador-edit.component';
import { ApostadorListComponent } from './apostador-list/apostador-list.component';



@NgModule({
  declarations: [ApostadorListComponent, ApostadorDetailComponent, ApostadorCreateComponent, ApostadorEditComponent],
  imports: [
    CommonModule, AppHeaderModule, ReactiveFormsModule
  ],
  exports: [ApostadorListComponent, ApostadorDetailComponent, ApostadorCreateComponent, ApostadorEditComponent]
})
export class ApostadorModule { }
