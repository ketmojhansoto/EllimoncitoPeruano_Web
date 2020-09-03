import { Component, OnInit, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { CarritodecompraService } from 'src/app/services/carrito/carritodecompra.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private user: SocialUser;
  private loggedIn: boolean;
  listaCarrito:any[]=[];

  constructor(private authService: AuthService,
    private carritoService: CarritodecompraService,
    private router: Router,
    ) { }

  ngOnInit() {

    this.listarCarrito();

    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
      this.loggedIn = (user != null);
    });
    
  }

  signOut(): void {
    this.authService.signOut();
  }

  listarCarrito(){
    this.carritoService.getCarta().subscribe(data => {
      this.listaCarrito = data;
      console.log(this.listaCarrito);
    },
      error => alert(error),
      );
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (document.body.scrollTop > 60 ||
      document.documentElement.scrollTop > 60) {
      $('.navbar').addClass('fondoarriba animated fadeInDown');
    }
    else if (document.body.scrollTop === 0 ||
      document.documentElement.scrollTop === 0) { 
      $('.navbar').removeClass('fondoarriba animated fadeInDown ');
    }
  }

  

}
