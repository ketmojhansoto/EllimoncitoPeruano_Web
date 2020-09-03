import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ScriptsService } from '../scripts/scripts.service';
import { ReservasService } from '../reserva/reservas.service';
import { EnviocorreoService } from '../enviocorreo/enviocorreo.service';

export declare let Culqi;
@Injectable({
  providedIn: 'root'
})
export class NgCulqiService {

  token_id: string;
  correo:string;
  settings: any = {
    title: '',
    currency: '',
    description: '',
    amount: 0
  };
  ventas: any []= [];
  correoenvio: any []= [];

  constructor(
    private scriptService: ScriptsService,
    private router: Router,
    public http: HttpClient, 
    private reservaService: ReservasService,
    private sendEmail: EnviocorreoService
  ) {
    document.addEventListener ('payment_event', (token: any) => {
    this.token_id = token.detail.id;
    this.correo = token.detail.email;
    console.log(this.token_id)

    let url = 'https://api.culqi.com/v2/charges';


    let headers = new HttpHeaders ()
        .set ('Content-Type', 'application/json')
        .set ('Authorization', 'Bearer sk_test_2ecec8df0cf6d3e6'); // Ingresa tu Private Key Aqui

      let body = JSON.stringify ({
        amount: this.settings.amount,
        currency_code: "PEN",
        email: this.correo,
        source_id: this.token_id
      });

      this.http.post (url, body, {headers: headers}).subscribe (
        response => {
          // Si el pago se realiza, disparamos este evento
        this.sendEmail.create(this.correoenvio).subscribe(
            (ok) => console.log("El envio el correo"),
            err=> console.log(err),
            () => window.location.reload()
            )

        this.reservaService.create(this.ventas).subscribe(
          (ok)=>this.router.navigate(['../success']),
          err=> console.log(err),
          () => console.log("El pago fue exitoso")
          )        
        }, error => {
          // Si el pago tiene algun error, disparamos otro evento con el error
        console.log(error);
        
        });
    }, false);

 
}


initCulqi() {
  this.scriptService
    .load('Culqi')
    .then(() => {
      Culqi.publicKey = 'pk_test_a77f0de5a02b3f53';
    })
    .catch(e => {
      console.log(e);
    });
}


  payorder( amount: number, venta: any,sendemail:any) {

    this.settings.title = 'Culqi - Ionic';
    this.settings.currency = "PEN";
    this.settings.amount = amount*100;
    this.ventas = venta;
    this.correoenvio = sendemail;
    console.log('Datos de Envio Correo');
    console.log(this.correoenvio);
    console.log('---------------------------------------');
    console.log(this.ventas);
    console.log('Venta Obtenida');
    
    
    Culqi.settings ({
      title: 'Limoncito Peruano',
      currency: 'PEN',
      description: 'Transferencia asegurada por Culqi',
      email: "i1820316@continental.edu.pe",
      amount: amount*100,
    }

    );

    Culqi.options({
      lang: 'es',
      modal: true,
      installments: false,
      customButton:"",
      style: {
        logo:
          'https://limonpimg.s3.us-east-2.amazonaws.com/img_web/logo.png' ,
        maincolor: '#7CC02C',
        buttontext: '#ffffff',
        maintext: '#4A4A4A',
        desctext: '#4A4A4A'
      }
  });
  Culqi.open ();
    
  }

  open () {
    Culqi.open (
      
    );
  }

}
