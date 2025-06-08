import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './modules/login/login.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { RegisterComponent } from './modules/register/component/register.component';
import { RegisterModule } from './modules/register/register.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    //HttpClientModule, deprecated tackoverflow.com/questions/78430636/httpclientmodule-is-deprecated-in-angular-18-whats-the-replacement
    LoginModule,
    DashboardModule,
    RegisterModule

  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
