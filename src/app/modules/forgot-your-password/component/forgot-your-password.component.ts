import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service'; // Asegúrate de importar el servicio correcto

@Component({
  selector: 'app-forgot-your-password',
  templateUrl: './forgot-your-password.component.html',
  styleUrl: './forgot-your-password.component.css'
})
export class ForgotYourPasswordComponent {

  forgotPasswordForm: FormGroup;
  submitted = false;
  isLoading = false;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private fb: FormBuilder, private yourService: UserService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;
    // validar contraseñas coinciden
    if (this.forgotPasswordForm.invalid || this.forgotPasswordForm.get('password')?.value !== this.forgotPasswordForm.get('confirmPassword')?.value) {
      alert('Las contraseñas no coinciden.');
      console.log('Las contraseñas no coinciden.');
      return;
    }
    
    this.isLoading = true;
    const formData = this.forgotPasswordForm.value;
    
    this.yourService.updatePassword(formData.email, {
      newPassword: formData.password,
      confirmPassword: formData.confirmPassword
    }).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        alert('Contraseña actualizada correctamente.');
        console.log('Contraseña actualizada correctamente.');
      },
      error: (error: any) => {
        this.isLoading = false;
        alert('Hubo un error al actualizar la contraseña.');
        console.log('Hubo un error al actualizar la contraseña.');
      },
    }
     
    );
  }
}
