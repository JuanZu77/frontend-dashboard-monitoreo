import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { ForgotYourPasswordComponent } from './component/forgot-your-password.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ForgotYourPasswordComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class ForgotYourPasswordModule { }
