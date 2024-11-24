import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  hide = true;
  errorMessage: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = null;

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    if (!email || !password || this.loginForm.invalid) {
      console.log('Formulario inválido');
      return;
    }

    // Llamamos al servicio de login
    this.userService.login(email, password).subscribe(
      (response) => {
        console.log('Inicio de sesión exitoso:', response);
        // Redirigir al dashboard
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Error en el inicio de sesión:', error);
        this.errorMessage = 'Correo o contraseña incorrectos';
      }
    );
  }
}
