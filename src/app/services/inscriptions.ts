import { Injectable, signal, inject } from '@angular/core';
import { InscriptionCours, NouvelleInscription } from '../donnees/inscription-cours';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Session } from './session';

@Injectable({
  providedIn: 'root'
})
export class Inscriptions {
    private http = inject(HttpClient);
  private session = inject(Session);
  private _liste = signal<InscriptionCours[]>([]);

  readonly liste = this._liste.asReadonly();

  charger(): Observable<InscriptionCours[]> {

    return this.http
      .get<InscriptionCours[]>(
        '/inscriptions',
        {
          params: {
            utilisateur: this.session.nom()
          }
        }
      )
      .pipe(
        tap((liste) => this._liste.set(liste))
      );
  }

  // CREATE
  ajouter(
    donnees: NouvelleInscription
  ): Observable<InscriptionCours> {

    const nouvelle = {
      ...donnees,
      utilisateur: this.session.nom()
    };

    return this.http
      .post<InscriptionCours>(
        '/inscriptions',
        nouvelle
      )
      .pipe(
        tap((creee) =>
          this._liste.update(
            (l) => [...l, creee]
          )
        )
      );
  }

  // UPDATE
  modifierNiveau(
    id: number,
    niveau: string
  ): Observable<InscriptionCours> {

    return this.http
      .patch<InscriptionCours>(
        `/inscriptions/${id}`,
        { niveau }
      )
      .pipe(
        tap((maj) =>
          this._liste.update(
            (l) =>
              l.map(
                (i) =>
                  i.id === id ? maj : i
              )
          )
        )
      );
  }

  // DELETE
  annuler(id: number): Observable<unknown> {

    return this.http
      .delete(`/inscriptions/${id}`)
      .pipe(
        tap(() =>
          this._liste.update(
            (l) =>
              l.filter(
                (i) => i.id !== id
              )
          )
        )
      );
  }

  estInscrit(coursId: number): boolean {

    return this._liste().some(
      (i) => i.coursId === coursId
    );
}
vider() {
  this._liste.set([]);
}
}