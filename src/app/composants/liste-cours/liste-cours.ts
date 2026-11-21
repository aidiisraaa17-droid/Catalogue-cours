import { Component, Output, EventEmitter,inject } from '@angular/core'; 
import { CommonModule, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FiltreCoursPipe } from '../../pipes/filtre-cours-pipe';
import { TriCoursPipe } from '../../pipes/tri-cours-pipe';
import { PlacesRestantesPipe } from '../../pipes/places-restantes-pipe';
import { TronquerPipe } from '../../pipes/tronquer-pipe';
import { Cours } from '../../donnees/cours';
import { Catalogue } from '../../services/catalogue';
import { RouterLink } from '@angular/router';
import {
  OnInit,
  signal
} from '@angular/core';

@Component({
  selector: 'app-liste-cours',
  imports: [
    CommonModule,
    FormsModule,
    FiltreCoursPipe,
    TriCoursPipe,
    PlacesRestantesPipe,
    UpperCasePipe,
    RouterLink,
    TronquerPipe
  ],
  templateUrl: './liste-cours.html',
  styleUrl: './liste-cours.css'
})
export class ListeCours {
  private catalogue = inject(Catalogue);
   @Output()
  coursSelectionne = new EventEmitter<Cours>();

  coursActif: Cours | null = null;

  cours = signal<Cours[]>([]);
  chargement = signal(true);
  erreur = signal('');

  recherche = '';
 tri: 'asc' | 'desc' = 'asc';

  ngOnInit() {

    this.catalogue.lister().subscribe({

      next: (liste) => {
        this.cours.set(liste);
        this.chargement.set(false);
      },

      error: () => {
        this.erreur.set(
          "Impossible de charger les cours. L'API est-elle démarrée ?"
        );

        this.chargement.set(false);
      }

    });
  }

  selectionner(c: Cours) {
    this.coursActif = c;
    this.coursSelectionne.emit(c);
  }

}


