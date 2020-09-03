import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private apiUrl = `${environment.miApi}/comentario`;
  
  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
