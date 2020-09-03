import { Component, OnInit } from '@angular/core';
import { CarritodecompraService } from 'src/app/services/carrito/carritodecompra.service';
import { FormGroup, FormControl } from '@angular/forms';
import { OrdenonlineService } from 'src/app/services/orden/ordenonline.service';
import { ReservasService } from 'src/app/services/reserva/reservas.service';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { ActivatedRoute, Router } from '@angular/router';
import { UseridService } from 'src/app/services/userid/userid.service';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { DateclienteService } from 'src/app/services/datecliente/datecliente.service';
import { NgCulqiService } from 'src/app/services/culqi/ng-culqi.service';
import { MesasService } from 'src/app/services/mesas/mesas.service';
import { UserService } from 'src/app/services/user/user.service';
import { EmailordenService } from 'src/app/services/emailorden/emailorden.service';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  datosProductoEnviarEmail: any[]=[];
  listaCarrito: any[];
  totalCarrito: number;
  checkreserva = true;
  checkorden = false;
  productosOrden: any[] = [];
  private user: SocialUser;
  private loggedIn: boolean;
  userIdT: any[] = [];
  clientes: any[] = [];
  clienteIdT: any[] = [];
  fecha: any;
  mesas: any[]=[];
  cadmesa: number;
  mesaflt:any[]=[];
  mesaSelecionanda:any;
  emaildatos:any[]=[];
  private existe: boolean;
  clienteAlmacenado: any[] = [];
  usuarioIdCreado: any[] = [];

  constructor(
    private carritoComprasService: CarritodecompraService,
    private ordenonlineService: OrdenonlineService,
    private clienteService: ClientesService,
    private userIdService: UseridService,
    private userService: UserService,
    private reservaService: ReservasService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private dateCliService: DateclienteService,
    private router: Router,
    private ngCulqiService: NgCulqiService,
    private mesasService: MesasService,
    private emailorden: EmailordenService,

  ) { }

  ordenForm = new FormGroup({
    direccion: new FormControl(''),
    telefono: new FormControl(''),
    tipo: new FormControl('Delivery'),
    estado: new FormControl('Pendiente'),
    total: new FormControl(''),
    productos: new FormControl(''),
    idCliente: new FormControl('')
  });

  reservaForm = new FormGroup({
    fecha: new FormControl(this.fecha = this.getNowDate()),
    hora: new FormControl(''),
    estado: new FormControl('Pendiente'),
    total: new FormControl(''),
    idMesa: new FormControl('1'),
    idCliente: new FormControl(''),
    productos: new FormControl(''),
    cadmesa: new FormControl(''),
    
  });

  userForm = new FormGroup({
    nombreuser: new FormControl(''),
    contrasenia: new FormControl(''),
  });

  editarCar = new FormGroup({
    adicional: new FormControl(''),
    cantidad: new FormControl(''),
  });

  ngOnInit() {
    this.listarCarrito();
    this.productosParaOrden();
    this.ngCulqiService.initCulqi();

    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log('Usuario de Social Login');
      console.log(user);
      this.loggedIn = (user != null);
      if (this.user) {
        this.clienteService.list()
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
                      //this.router.navigate(['../account']);
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


  getNowDate() {
    var fecha = new Date();
    var today = new Date();
    var dd = today.getDate() + 1;
    var mm = today.getMonth() + 1; //As January is 0.
    var yyyy = today.getFullYear();
    var returnDate = "";
    returnDate += yyyy;
    if (mm < 10) {
      returnDate += `-0${mm}`;
    } else {
      returnDate += `-${mm}`;
    }

    if (dd < 10) {
      returnDate += `-0${dd}`;
    } else {
      returnDate += `-${dd}`;
    }
    return returnDate;
  }

  guardarUserId(userId) {
    this.dateCliService.addIdCliente(userId);
    console.log('Guardo Cliente');
    this.listarUserId();
  }
  listarUserId() {
    this.dateCliService.getIdCliente().subscribe(data => {
      this.clienteIdT = data;
      console.log('Cliente Datos');
      console.log(this.clienteIdT);
    },
      error => alert(error),
    );
  }

  filtrarmesas() {
    this.mesasService.list()
      .subscribe(data => this.mesas = data, //funcion
        err => console.error(err),
        () => {console.log('Filtro Para Mesas');
        if (this.mesas) {
          console.log('despuesa');
          console.log(this.mesas);
          console.log('despuesa');
          this.mesaflt=[];
          for (const mesaf of this.mesas) {
            if (mesaf.capacidad >= this.cadmesa) {
              this.mesaflt.push(mesaf);
              console.log(this.mesaflt);
            }else{
              console.log('Ingreso Elsa'); 
              console.log(mesaf.capacidad);
              console.log('---------'); 
            }
          }
        }
        },
      );
    ;
  }

  seleccionarMesa(mesaselect){
    this.mesaSelecionanda = mesaselect;
  }
  
 

  listarCarrito() {
    this.carritoComprasService.getCarta().subscribe(data => {
      this.listaCarrito = data;
      this.totalCarrito = 0;
      for (const prod of this.listaCarrito) {
        this.totalCarrito = this.totalCarrito + (prod.producto.precio * prod.cantidad);
      }
      console.log("Lista Carrito");
      console.log(this.listaCarrito);
    },
      error => alert(error),
    );
  }

  listarCarta() {
    this.userIdService.getUserId().subscribe(data => {
      this.userIdT = data;
      console.log(this.userIdT);
    },
      error => alert(error),
    );
  }

  editarCarrito(numero: number, adicional:string){
    this.listaCarrito.splice(numero, 0, adicional);
    console.log("Editando Lista Carrito");
    
    console.log(this.listaCarrito);
    
  }

  eliminarproductocarrito(numero: number) {
    this.listaCarrito.splice(numero, 1);
    console.log(this.listaCarrito);
  }

  checkReserva() {
    this.checkorden = false;
    this.checkreserva = true;
  }
  checkOrden() {
    this.checkorden = true;
    this.checkreserva = false;
  }

  productosParaOrden() {
    for (const list of this.listaCarrito) {
      this.productosOrden.push(
        {
          idProducto: list.producto.idProducto,
          cantidad: list.cantidad,
          subtotal: (list.cantidad * list.producto.precio),
          adicional: list.adicional,
        });
    }
    console.log('PRODUCTOS ORDEN')
    console.log(this.productosOrden)
    console.log('PRODUCTOS ORDEN')
    console.log('USUARIO ID');
    console.log(this.userIdT);
    console.log('USUARIO ID');
  }


      
      
  

  crearOrden() {
    this.ordenForm.controls['productos'].setValue(this.productosOrden)
    this.ordenForm.controls['idCliente'].setValue(this.clienteAlmacenado[0].idCliente)
    this.ordenForm.controls['total'].setValue(this.totalCarrito)
    console.log('ORDEN CREAR')
    console.log(this.ordenForm.value);
    console.log('ORDEN CREAR')
    for (const pro of this.listaCarrito) {
      this.datosProductoEnviarEmail.push({
        cantidad: pro.cantidad ,
        nombre: pro.producto.nombre,
        precio:pro.producto.precio,
        imagen: pro.producto.imagen,
      });  
    }
    console.log('datosCarritoCargado');
    console.log(this.datosProductoEnviarEmail[0]);
    
    this.emaildatos.push(
      {
        name: this.user.firstName,
        email: this.user.email,
        direccion: this.ordenForm.controls['direccion'].value,
        telefono: this.ordenForm.controls['telefono'].value,
        total: this.totalCarrito,
        productos:this.datosProductoEnviarEmail,
      }
    )
      console.log('datos envio Email');
      console.log(this.emaildatos[0]);
    this.ordenonlineService.create(this.ordenForm.value).subscribe(

      (ok) => {
       ( this.router.navigate(['../success']).
        then(() => window.location.reload()));
        this.emailorden.create(this.emaildatos[0]).subscribe(
          (ok) => console.log("El envio el correo"),
          err=> console.log(err),
          () => window.location.reload()
          );
      },
      (err) => console.log(err)
    )
  }



  crearReserva() {

    this.reservaForm.controls['productos'].setValue(this.productosOrden)
    this.reservaForm.controls['idMesa'].setValue(this.mesaSelecionanda)
    this.reservaForm.controls['idCliente'].setValue(this.clienteAlmacenado[0].idCliente)
    this.reservaForm.controls['total'].setValue(this.totalCarrito)
    console.log(this.reservaForm.value);
    for (const pro of this.listaCarrito) {
      this.datosProductoEnviarEmail.push({
        cantidad: pro.cantidad ,
        nombre: pro.producto.nombre,
        precio:pro.producto.precio,
        imagen: pro.producto.imagen,
      });  
    }
    console.log('datosCarritoCargado');
    console.log(this.datosProductoEnviarEmail[0]);
    
    this.emaildatos.push(
      {
        name: this.user.firstName,
        email: this.user.email,
        fecha: this.reservaForm.controls['fecha'].value,
        hora: this.reservaForm.controls['hora'].value,
        mesa: this.mesaSelecionanda,
        total: this.totalCarrito,
        productos:this.datosProductoEnviarEmail,
      }
    )
      console.log('datos envio Email');
      console.log(this.emaildatos[0]);
      
    this.ngCulqiService.payorder(this.totalCarrito,this.reservaForm.value,this.emaildatos[0]);
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
