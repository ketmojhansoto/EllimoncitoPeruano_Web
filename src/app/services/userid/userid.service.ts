import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UseridService {

  private subject: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private usuarioId: any[] = [];

  constructor() {
    this.subject.subscribe(data => this.usuarioId = data);
   }

 /**
   * Add User Id
   *
   */
  addUserId(userId: String) {
    this.subject.next([...this.usuarioId,userId]);
  }

  /**
   * Get User
   */
  getUserId(): Observable<any[]> {
    return this.subject;
    console.log(this.subject);
  }

}
