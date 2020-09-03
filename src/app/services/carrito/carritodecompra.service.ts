import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritodecompraService {


  private subject: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private itemsCarrito: any[] = [];
  valExite: boolean;

  constructor() {
    this.subject.subscribe(data => this.itemsCarrito = data);
  }
  /**
   * addCarta
   *
   */
  addCarta(producto: any, cantidad: number, adicional: string) {

    this.valExite = false;
    if (this.itemsCarrito.length === 0) {

      this.subject.next([...this.itemsCarrito, { producto, cantidad, adicional }]);
    }
    else {
      for (const cart of this.itemsCarrito) {
        
        if (producto.idProducto === cart['producto'].idProducto) {

          cart['cantidad'] = cart['cantidad'] + cantidad;
          this.valExite = true;

        }


      }
      if (this.valExite !== true) {
        this.subject.next([...this.itemsCarrito, { producto, cantidad, adicional }]);

      }

    }

    // this.subject.next([...this.itemsCarrito, {producto,cantidad,adicional}]);
  }

  /**
   * getCarta
   */
  getCarta(): Observable<any[]> {
    return this.subject;
    console.log(this.subject);
  }

  /**
   * getTotal
   */
  getTotal() {
    return this.itemsCarrito.reduce((total, producto: any) => { return total + producto.precioUnidad; }, 0);
  }
}

