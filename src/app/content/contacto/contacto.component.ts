import { Component, OnInit } from '@angular/core';
import { ComentarioService } from 'src/app/services/comentario/comentario.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  constructor(private comentarioService: ComentarioService,

    
    ) { }
  
    comentarioForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      message: new FormControl('')
    });

  ngOnInit() {
  }

  enviarComentario(){
    console.log(this.comentarioForm.value);
    
    this.comentarioService.create(this.comentarioForm.value).subscribe(
      (ok) => console.log("El Comentario Se Envio"),
      err=> console.log(err),
      () => window.location.reload()
      )
  }

  
}
