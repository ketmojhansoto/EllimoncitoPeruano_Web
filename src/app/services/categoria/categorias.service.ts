import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private apiUrl = `${environment.miApi}/categorias`;
    
    constructor(private http: HttpClient) { }
  
    list(): Observable<any> {
      return this.http.get(this.apiUrl);
    }
    get(id: number): Observable<any> {
      return this.http.get(`${this.apiUrl}/${id}`);
    }
}
