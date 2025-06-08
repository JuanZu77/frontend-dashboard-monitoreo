import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-your-password',
  templateUrl: './forgot-your-password.component.html',
  styleUrls: ['./forgot-your-password.component.css']
})
export class ForgotYourPasswordComponent {

  forgotPasswordForm: FormGroup;
  submitted = false;
  isLoading = false;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;

    // validar si las contraseñas coinciden
    if (
      this.forgotPasswordForm.invalid ||
      this.forgotPasswordForm.get('password')?.value !== this.forgotPasswordForm.get('confirmPassword')?.value
    ) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    this.isLoading = true;
    const formData = this.forgotPasswordForm.value;

    this.userService.searchByEmail(formData.email).subscribe({
      next: (response: any) => {
         if (response.user && response.user.id) { // Validar la existencia del usuario
            this.userService.updatePassword(response.user.id, {
              newPassword: formData.password,
              confirmPassword: formData.confirmPassword
            }).subscribe({
                next: () => {
                  this.isLoading = false;
                  alert('Contraseña actualizada correctamente.');
                  this.router.navigate(['/login']);  
                  this.submitted = false;
                },
                error: (error: any) => {
                  this.isLoading = false;
                  console.error(error);
                }
            });
         } else {
            this.isLoading = false;
            alert('Usuario no encontrado.');
         }
      },
      error: (error: any) => {
         this.isLoading = false;
         alert('Hubo un error al buscar los usuarios.');
         console.error('Error al buscar los usuarios:', error.message);
      }
   });
  }

}
