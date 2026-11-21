import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';

import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Cours } from '../../donnees/cours';

import { Session } from '../../services/session';
import { Catalogue } from '../../services/catalogue';
import { Inscriptions } from '../../services/inscriptions';


@Component({
  selector: 'app-mes-inscriptions',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './mes-inscriptions.html',
  styleUrl: './mes-inscriptions.css'
})
export class MesInscriptions implements OnInit {

  // Service de session
  session = inject(Session);

  // Service qui permet de récupérer les cours
  private catalogue = inject(Catalogue);

  // Service qui gère les inscriptions
  inscriptions = inject(Inscriptions);

  // Liste des cours
  cours = signal<Cours[]>([]);

  // Message d'erreur
  erreur = signal('');

  // Les différents niveaux possibles
  niveaux = [
    {
      valeur: 'debutant',
      libelle: 'Débutant'
    },
    {
      valeur: 'intermediaire',
      libelle: 'Intermédiaire'
    },
    {
      valeur: 'avance',
      libelle: 'Avancé'
    }
  ];


  // Chargement des cours au démarrage
  ngOnInit() {

    this.catalogue
      .lister()
      .subscribe({

        next: (liste) => {

          this.cours.set(liste);

        },

        error: () => {

          this.erreur.set(
            'Impossible de charger les cours.'
          );

        }

      });

  }


  // Retourne le titre d'un cours
  titre(coursId: number): string {

    return this.cours()
      .find(
        c => c.id === coursId
      )
      ?.titre ?? 'Cours inconnu';

  }


  // Annuler une inscription
  annuler(id: number) {

    this.inscriptions
      .annuler(id)
      .subscribe({

        next: () => {
          // La liste est déjà mise à jour
          // dans le service Inscriptions
        },

        error: () => {

          this.erreur.set(
            "L'annulation a échoué."
          );

        }

      });

  }


  // Modifier le niveau d'une inscription
  changerNiveau(
    id: number,
    niveau: string
  ) {

    this.inscriptions
      .modifierNiveau(id, niveau)
      .subscribe({

        next: () => {
          // La liste est déjà mise à jour
          // dans le service Inscriptions
        },

        error: () => {

          this.erreur.set(
            'La modification a échoué.'
          );

        }

      });

  }

}