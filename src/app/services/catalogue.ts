import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Cours } from '../donnees/cours';

@Injectable({
  providedIn: 'root'
})
export class Catalogue {

  private http = inject(HttpClient);

  lister(): Observable<Cours[]> {
    return this.http.get<Cours[]>('/cours');
  }

  trouver(id: number): Observable<Cours> {
    return this.http.get<Cours>(`/cours/${id}`);
  }
}