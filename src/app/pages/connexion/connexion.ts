import {
  Component,
  Input,
  inject,
  signal
} from '@angular/core';
import { Inscriptions } from '../../services/inscriptions';

import {
  Router
} from '@angular/router';

import {
  FormsModule
} from '@angular/forms';

import {
  Session
} from '../../services/session';

@Component({
  selector: 'app-connexion',
  standalone: true,

  imports: [
    FormsModule
  ],

  templateUrl: './connexion.html',
  styleUrl: './connexion.css'
})
export class Connexion {
  private inscriptions = inject(Inscriptions);

erreur = signal('');

  private session = inject(Session);

  private router = inject(Router);

  @Input()
  retour = '';

  nom = '';

  seConnecter() {

 this.session.connecter(this.nom);

  this.inscriptions.charger().subscribe({

    next: () => {
      this.router.navigateByUrl(
        this.retour || '/mes-inscriptions'
      );
    },

    error: () => {
      this.erreur.set(
        'Connexion établie, mais vos inscriptions sont inaccessibles (API arrêtée ?).'
      );
    }

  });

  }

}