import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/producto/productos.service';
import { CarritodecompraService } from 'src/app/services/carrito/carritodecompra.service';
import { FormControl, FormGroup } from '@angular/forms';
import { __asyncValues } from 'tslib';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  productos: any[];
  detalleproducto: any;
  prueba: any[];
  cantidad: number;
  adicional: string;



  constructor(private prodService: ProductosService,
    private carritoComprasService: CarritodecompraService
  ) { }

  ordenForm = new FormGroup({
    cantidad: new FormControl(''),
    adicional: new FormControl(''),
  });

  ngOnInit() {
    this.listarProductos();
    this.ordenForm.controls['cantidad'].setValue(1);
  }

  listarProductos() {
    this.prodService.list()
      .subscribe(data => this.productos = data, //funcion
        err => console.error(err),
        () => console.log('Productos Listados'),
      );
    ;
  }


  obtenerDetalle(id: number) {
    console.log(id);

    this.prodService.get(id).subscribe(
      dato => this.detalleproducto = dato,
      err => console.log(err),
      () => console.log(this.detalleproducto),
    );
  }


  addProducto(producto) {
    this.cantidad = this.ordenForm.controls['cantidad'].value
    this.adicional = this.ordenForm.controls['adicional'].value
    this.carritoComprasService.addCarta(producto, this.cantidad, this.adicional);
    this.listarCarta();
    this.ordenForm.controls['cantidad'].setValue(1);
    this.ordenForm.controls['adicional'].setValue('');
    console.log('lo que manda');

    console.log(producto);

  }
  limpiarNud() {
    this.ordenForm.controls['cantidad'].setValue(1);
    this.ordenForm.controls['adicional'].setValue('');
  }

  listarCarta() {
    this.carritoComprasService.getCarta().subscribe(data => {
      this.prueba = data;
      console.log('Prueba');

      console.log(this.prueba);
    },
      error => alert(error),
    );
  }

  onchange() {
    if (this.ordenForm.controls['cantidad'].value < 0) {
      this.ordenForm.controls['cantidad'].setValue(1);
    } else if (this.ordenForm.controls['cantidad'].value === 0) {
      this.ordenForm.controls['cantidad'].setValue(1);
    }
    else if (this.ordenForm.controls['cantidad'].value > 20) {
      this.ordenForm.controls['cantidad'].setValue(20);
    } else {
      console.log('Numero Bien');

    }
  }








}
























