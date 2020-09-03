import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/producto/productos.service';
import { CategoriasService } from 'src/app/services/categoria/categorias.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  productos: any[];
  categorias: any[];

  constructor(
    private prodService: ProductosService,
    private catService: CategoriasService
  ) {
    
   }

  ngOnInit() {
    this.listarProductos();
    this.listarCategorias();
  
  }

  listarProductos() {
    this.prodService.list()
      .subscribe(data => this.productos = data, //funcion
                  err => console.error(err),
                  () => console.log('Productos Listados'),
                  );
    ;
  }
  listarCategorias() {
    this.catService.list()
      .subscribe(data => this.categorias = data, //funcion
                  err => console.error(err),
                  () => console.log('Categorias Listados'),
                  );
    ;
  }



  galeria:Array<any> = [
    {
      "nombre":"Plato Nuevo",
      "descripcion":"Pronto con nuevos platos #pronto_nuevos_cambios",
      "img":"/assets/img/galeria2.jpg"
    },
    {
      "nombre":"Nos Mudamos",
      "descripcion":"Pronto con tendremos un nuevo local #pronto_nuevos_cambios",
      "img":"/assets/img/galeria3.jpg"
    },
    {
      "nombre":"Producto Nuevo",
      "descripcion":"Pronto con nuevos  a la carta #pronto_nuevos_cambios",
      "img":"/assets/img/galeria4.jpg"
    },
    {
      "nombre":"Producto Nuevo",
      "descripcion":"Pronto con nuevos  a la carta #pronto_nuevos_cambios",
      "img":"/assets/img/galeria5.jpg"
    },
    {
      "nombre":"Producto Nuevo",
      "descripcion":"Pronto con nuevos  a la carta #pronto_nuevos_cambios",
      "img":"/assets/img/galeria4.jpg"
    },
    {
      "nombre":"Producto PRUEBA",
      "descripcion":"Pronto con nuevos  a la carta #pronto_nuevos_cambios",
      "img":"/assets/img/galeria5.jpg"
    }
  ]



}
