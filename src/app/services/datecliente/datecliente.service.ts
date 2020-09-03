import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateclienteService {

  private subject: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private clienteId: any[] = [];

  constructor() {
    this.subject.subscribe(data => this.clienteId = data);
   }

 /**
   * Add Cliente Id
   *
   */
  addIdCliente(cliId: String) {
    this.subject.next([...this.clienteId,cliId]);
  }

  /**
   * Get Cliente
   */
  getIdCliente(): Observable<any[]> {
    return this.subject;
    console.log(this.subject);
  }
}
