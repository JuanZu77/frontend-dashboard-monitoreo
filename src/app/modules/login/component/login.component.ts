import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
 
  loginForm!: FormGroup;
  submitted = false;
  hide = true;

  constructor() { }
 
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email]), 
      password: new FormControl('', [Validators.minLength(8)]) 
    });
  }


  onSubmit() {
    this.submitted = true;
    // Verificamos manualmente si los campos están vacíos
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    // Evitar envío si alguno de los campos está vacío
    if (!email || !password) {
      console.log('Por favor, complete todos los campos');
      return; // Si están vacíos, no continuamos con el envío
    }

    // Verificamos si el formulario es válido
    if (this.loginForm.valid) {
      console.log('Formulario enviado:', this.loginForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}
