import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './content/inicio/inicio.component';
import { NosotrosComponent } from './content/nosotros/nosotros.component';
import { MenuComponent } from './content/menu/menu.component';
import { ContactoComponent } from './content/contacto/contacto.component';
import { ReservaComponent } from './content/reserva/reserva.component';
import { OrdenonlineComponent } from './content/ordenonline/ordenonline.component';
import { LoginComponent } from './login/login/login.component';
import { SiginComponent } from './login/sigin/sigin.component';
import { CarritoComponent } from './content/carrito/carrito.component';
import { AccountComponent } from './login/account/account.component';
import { RyordenComponent } from './success/ryorden/ryorden.component';


const routes: Routes = [
  {path: 'inicio',component:InicioComponent},
  {path: 'nosotros',component:NosotrosComponent},
  {path: 'menu',component:MenuComponent},
  {path: 'contacto',component:ContactoComponent},
  {path: 'login',component:LoginComponent},
  {path: 'sigin',component:SiginComponent},
  {path: 'carrito',component:CarritoComponent},
  {path: 'account',component:AccountComponent},
  {path: 'success',component:RyordenComponent},
  {path: '**', pathMatch: 'full',redirectTo:'inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
