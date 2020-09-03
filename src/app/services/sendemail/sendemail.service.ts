import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendemailService {

  private subject: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private email: any[] = [];

  constructor() {
    this.subject.subscribe(data => this.email = data);
   }

 /**
   * Add Cliente Id
   *
   */
  addDatosEmail(datosemail: String) {
    this.subject.next([...this.email,datosemail]);
  }

  /**
   * Get Cliente
   */
  getDatosEmail(): Observable<any[]> {
    return this.subject;
    console.log(this.subject);
}
}