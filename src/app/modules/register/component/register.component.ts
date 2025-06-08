import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  hide = true;
  errorMessage: string | null = null;
  isMobile: boolean = false;
  showRectanguloGris: boolean = false;
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.checkWindowSize();
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.minLength(8)),
      confirmPassword: new FormControl(''),
    });
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = null;

    const firstNameControl = this.registerForm.get('firstName');
    const lastNameControl = this.registerForm.get('lastName');
    const emailControl = this.registerForm.get('email');
    const passwordControl = this.registerForm.get('password');
    const confirmPasswordControl = this.registerForm.get('confirmPassword');

    if (!firstNameControl?.value) {
      firstNameControl?.setErrors({ required: true });
    }
    if (!lastNameControl?.value) {
      lastNameControl?.setErrors({ required: true });
    }
    if (!emailControl?.value) {
      emailControl?.setErrors({ required: true });
    }
    if (!passwordControl?.value) {
      passwordControl?.setErrors({ required: true });
    }
    if (!confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors({ required: true });
    }

    if (this.registerForm.invalid) {
      console.log('Formulario inválido: revisar errores.');
      return;
    }

    if (passwordControl?.value !== confirmPasswordControl?.value) {
      console.log('Formulario inválido: las contraseñas no coinciden.');
      alert('Formulario inválido: las contraseñas no coinciden.');
      confirmPasswordControl?.setErrors({ notMatching: true });
      return;
    }

    this.isLoading = true;

    this.userService
      .registerUser({
        name: firstNameControl?.value,
        lastName: lastNameControl?.value,
        email: emailControl?.value,
        password: passwordControl?.value,
      })
      .subscribe({
        next: (response: any) => {
          console.log('Registro exitoso:', response);
          alert('Registro exitoso. ¡Bienvenido!');
          this.router.navigate(['/login']);
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error('Error en el registro:', error);
          this.isLoading = false;

          if (error.status === 409) {
            alert('El correo ya está registrado. Por favor, usa otro email.');
          } else {
            alert('Hubo un problema al registrarte. Intenta nuevamente más tarde.');
          }
        },
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkWindowSize();
    }
  }

  checkWindowSize() {
    if (isPlatformBrowser(this.platformId)) {
      const width = window.innerWidth;
      this.isMobile = width <= 768;
    }
  }
}
