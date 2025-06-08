import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/component/login.component';
import { DashboardComponent } from './modules/dashboard/component/dashboard.component';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { RegisterComponent } from './modules/register/component/register.component';
import { ForgotYourPasswordComponent } from './modules/forgot-your-password/component/forgot-your-password.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot', component: ForgotYourPasswordComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
