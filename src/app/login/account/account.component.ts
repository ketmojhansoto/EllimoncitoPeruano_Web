import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { UseridService } from 'src/app/services/userid/userid.service';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { AuthService, SocialUser } from 'angularx-social-login';
import { __asyncValues, __values } from 'tslib';
import { ok } from 'assert';
import { DatePipe } from '@angular/common';
import { DateclienteService } from 'src/app/services/datecliente/datecliente.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  private user: SocialUser;
  private loggedIn: boolean;
  useridT: any;
  clienteT:any[]= [];
  editar: boolean;
  pwd: number = 123456;

  constructor(private userService: UserService,
    private router: Router,
    private userIdService: UseridService,
    private clienteService: ClientesService,
    private authService: AuthService,
    private datosCliente: DateclienteService,
    
    ) { }

 
  clienteForm = new FormGroup({
    nombres: new FormControl(''),
    apellidos: new FormControl(''),
    telefono: new FormControl(''),
    direccion: new FormControl(''),
    email: new FormControl(''),
    dni: new FormControl(''),
    idUser: new FormControl(''),
  });

  actualizarForm = new FormGroup({
    nombres: new FormControl(__asyncValues),
    apellidos: new FormControl(__asyncValues),
    telefono: new FormControl(__asyncValues),
    direccion: new FormControl(__asyncValues),
    email: new FormControl(__asyncValues),
    dni: new FormControl(__asyncValues),
    idUser: new FormControl(''),
  });

  ngOnInit() {
    
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
      this.loggedIn = (user != null);
    });
    this.listarUserId();
    this.listarCliente();
    
  }
  habilitar(){
    this.editar = true;
  }
  deshabilitar(){
    this.editar = false;
  }

  listarCliente(){
    this.datosCliente.getIdCliente().subscribe(data => {
      this.clienteT = data;
      console.log('Datos Del Clien  te Traidos del Servicio Interno');
      console.log(this.clienteT[0]);
    },
      error => alert(error),
      );
  }
  listarUserId(){
    this.userIdService.getUserId().subscribe(data => {
      this.useridT = data;
      console.log('UsuarioId Traido del Servicio Internos');
      console.log(this.useridT[0].idUser);
    },
      error => alert(error),
      );
  }



  crearCliente(){
    this.clienteForm.controls['idUser'].setValue(this.useridT[0].idUser)
    this.clienteForm.controls['nombres'].setValue(this.user.firstName)
    this.clienteForm.controls['apellidos'].setValue(this.user.lastName)
    this.clienteForm.controls['email'].setValue(this.user.email)
    console.log(this.clienteForm.value) 
    this.clienteService.create(this.clienteForm.value).subscribe(
      (ok) => {
        console.log('Cliente Creado'),
        this.router.navigate(['/menu'])},
      (err) => console.log(err),
      
    ) 
  }

  actualizarCliente(){
    this.actualizarForm.controls['idUser'].setValue(this.clienteT[0].usuario.idUser)
    this.clienteService.update(this.clienteT[0].idCliente,this.actualizarForm.value).subscribe(
      (ok)=> {
        console.log('Actualizado'),
        this.router.navigate(['/menu'])},
      (err) => console.log(err)
    )
  }

}
