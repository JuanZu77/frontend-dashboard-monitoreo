import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { isPlatformBrowser } from '@angular/common';

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

  isMobile: boolean = false;


  constructor(private userService: UserService, private router: Router, @Inject(PLATFORM_ID) private platformId: any) {this.checkWindowSize();}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.minLength(8)),
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

    this.userService.login(email, password)
    .subscribe({
      next:(response:any)=>{
        console.log('Inicio de sesión exitoso:', response);
        this.router.navigate(['/dashboard']);

      },
      error:(error:any)=>{
        console.error('Error en el inicio de sesión:', error);
        this.errorMessage = 'Correo o contraseña incorrectos';
      }
    });
  }

  /*escuchar los cambios de la ventana*/
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkWindowSize();
    }
  }

  checkWindowSize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 768; 
    }
  }

    
}
