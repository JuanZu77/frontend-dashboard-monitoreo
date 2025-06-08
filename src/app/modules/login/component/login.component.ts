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
  showRectanguloGris: boolean = false;
  isLoading: boolean = false;


  constructor(private userService: UserService, private router: Router, @Inject(PLATFORM_ID) private platformId: any) {this.checkWindowSize();}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.minLength(8)),
    });
  }

  onSubmit() {
    this.submitted = true; // Marca el formulario como enviado
    this.errorMessage = null;
  
    // referencias de control
    const emailControl = this.loginForm.get('email');
    const passwordControl = this.loginForm.get('password');
  
    // seteo los errores de campos vacíos
    if (!emailControl?.value) {
      emailControl?.setErrors({ required: true });
    }
    if (!passwordControl?.value) {
      passwordControl?.setErrors({ required: true });
    }
  
    // si es invalido detenemos
    if (this.loginForm.invalid) {
      console.log('Formulario inválido: revisar errores.');
      return;
    }
  
    // validaciones
    if (emailControl?.hasError('email')) {
      console.log('Formulario inválido: email inválido');
      return;
    }
  
    if (passwordControl?.hasError('minlength')) {
      console.log('Formulario inválido: contraseña corta');
      return;
    }
  

    this.isLoading = true;
  
    const email = emailControl?.value;
    const password = passwordControl?.value;
  
    this.userService.login(email, password).subscribe({
      next: (response: any) => {
        console.log('Inicio de sesión exitoso:', response);
        this.router.navigate(['/dashboard']);
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error en el inicio de sesión:', error);
        this.errorMessage = 'Correo o contraseña incorrectos.';
        this.isLoading = false;
      },
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
      const width = window.innerWidth;
      this.isMobile = width <= 768; // Mobile: <=768px
    }
}  
    
}
