import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { InicioComponent } from './content/inicio/inicio.component';
import { NosotrosComponent } from './content/nosotros/nosotros.component';
import { MenuComponent } from './content/menu/menu.component';
import { ContactoComponent } from './content/contacto/contacto.component';
import { OrdenonlineComponent } from './content/ordenonline/ordenonline.component';
import { ReservaComponent } from './content/reserva/reserva.component';
import { LoginComponent } from './login/login/login.component';
import { SiginComponent } from './login/sigin/sigin.component';


// Login con redes sociales
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { CarritoComponent } from './content/carrito/carrito.component';
import { AccountComponent } from './login/account/account.component';
import { RyordenComponent } from './success/ryorden/ryorden.component';
import { from } from 'rxjs';
 
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("221865400754-nopmemo69r708v39ert721tda4gknv3l.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("192503871826648")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    NosotrosComponent,
    MenuComponent,
    ContactoComponent,
    OrdenonlineComponent,
    ReservaComponent,
    LoginComponent,
    SiginComponent,
    CarritoComponent,
    AccountComponent,
    RyordenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
