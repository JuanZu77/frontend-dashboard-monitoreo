import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/component/login.component';
import { DashboardComponent } from './modules/dashboard/component/dashboard.component';


const routes: Routes = [

  { path: 'login', component: LoginComponent },

   /*catalogo de este modo acepta Query Params*/
  { path: 'dashboard', component: DashboardComponent },

  //Si la ruta no existe reenvío a dashboard si esta logueado, de lo contrario deberá redireccionar a login
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
