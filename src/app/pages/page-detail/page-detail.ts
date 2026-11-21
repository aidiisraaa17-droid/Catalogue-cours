import {
  Component,
  Input,
  OnInit,
  inject,
  signal
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';

import { Cours } from '../../donnees/cours';

import {
  DetailCours
} from '../../composants/detail-cours/detail-cours';

import { Catalogue } from '../../services/catalogue';

@Component({
  selector: 'app-page-detail',
  standalone: true,

  imports: [
    DetailCours,
    RouterLink
  ],

  templateUrl: './page-detail.html',
  styleUrl: './page-detail.css'
})
export class PageDetail implements OnInit {

  private catalogue = inject(Catalogue);

  @Input()
  id = '';

  cours = signal<Cours | null>(null);
  chargement = signal(true);
  erreur = signal('');


  ngOnInit() {

     this.catalogue.trouver(Number(this.id)).subscribe({

      next: (c) => {
        this.cours.set(c);
        this.chargement.set(false);
      },

      error: (e: HttpErrorResponse) => {

        this.erreur.set(
          e.status === 404
            ? "Ce cours n'existe pas."
            : "Impossible de joindre l'API."
        );

        this.chargement.set(false);
      }

    });

  }
}