import { Component, OnInit } from '@angular/core';

import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { Router } from '@angular/router';
import { DateclienteService } from 'src/app/services/datecliente/datecliente.service';
import { UserService } from 'src/app/services/user/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { UseridService } from 'src/app/services/userid/userid.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: SocialUser;
  private loggedIn: boolean;
  clientes: any[] = [];
  clienteAlmacenado: any[] = [];
  usuarioIdCreado: any[] = [];
  private existe: boolean;

  constructor(private authService: AuthService,
    private router: Router,
    private dateCliService: DateclienteService,
    private clienteServices: ClientesService,
    private userService: UserService,
    private userIdService: UseridService ) { }


  userForm = new FormGroup({
    nombreuser: new FormControl(''),
    contrasenia: new FormControl(''),
  });

  ngOnInit() {

    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log('Usuario de Social Login');
      console.log(user);
      this.loggedIn = (user != null);
      if (this.user) {
        this.clienteServices.list()
          .subscribe(data => this.clientes = data, //funcion
            err => console.error(err),
            () => {
              console.log('Clientes Listados');

              for (const cli of this.clientes) {
                if (cli.email === this.user.email) {
                  console.log('Usuario Encontrado');
                  console.log(cli);
                  this.existe = true;
                  if (this.existe === true) {
                    this.dateCliService.addIdCliente(cli);
                    console.log('Guardo Cliente');
                    this.dateCliService.getIdCliente().subscribe(data =>{
                      this.clienteAlmacenado = data;
                      console.log(this.clienteAlmacenado[0]);
                      //this.router.navigate(['../account'])
                    })
                  }
                  } else {
                  }
                  // this.router.navigate(['../menu'])
                }
                if (this.existe !== true) {
                  this.existe = false;
                }
              if (this.existe === false) {
                console.log('Usuario No registrado');
                this.userForm.controls['nombreuser'].setValue(this.user.email)
                this.userForm.controls['contrasenia'].setValue(this.user.email)
                this.userService.create(this.userForm.value).subscribe(
                  (ok) => {
                    this.userIdService.addUserId(ok);
                    console.log('Creó y guardo Usuario');
                    this.userIdService.getUserId().subscribe(data =>{
                      this.usuarioIdCreado = data;
                      console.log(this.usuarioIdCreado[0]);
                      this.router.navigate(['../account']);
                    })
                  },

                  (err) => console.log(err)
                )
              }


            },
          );
        ;
      }
    });

  }

  listarClientes() {
    this.clienteServices.list()
      .subscribe(data => this.clientes = data, //funcion
        err => console.error(err),
        () => console.log('Clientes Listados'),
      );
    ;
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

}
