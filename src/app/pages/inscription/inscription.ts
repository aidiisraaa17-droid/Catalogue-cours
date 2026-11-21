import {
  Component,
  Input,
  OnInit,
  inject,
  signal
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { RouterLink } from '@angular/router';

import { Cours } from '../../donnees/cours';

import { Session } from '../../services/session';
import { Inscriptions } from '../../services/inscriptions';
import { Catalogue } from '../../services/catalogue';

import { nomComplet } from '../../validators/nom_complet';


@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css'
})
export class Inscription implements OnInit {

  private catalogue = inject(Catalogue);
  private session = inject(Session);

  inscriptions = inject(Inscriptions);

  @Input()
  id = '';

  cours = signal<Cours | null>(null);

  confirmation = signal('');

  envoiEnCours = signal(false);

  erreur = signal('');


  form = new FormGroup({

    nom: new FormControl('', [
      Validators.required,
      nomComplet
    ]),

    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    telephone: new FormControl('', [
      Validators.pattern(/^[0-9]{8}$/)
    ]),

    niveau: new FormControl('', [
      Validators.required
    ]),

    motivation: new FormControl('', [
      Validators.required,
      Validators.minLength(20)
    ]),

    conditions: new FormControl(false, [
      Validators.requiredTrue
    ])

  });


  ngOnInit() {

    // Pré-remplir le nom avec le nom de la session
    this.form.patchValue({
      nom: this.session.nom()
    });


    // Récupérer le cours depuis l'API
    this.catalogue
      .trouver(Number(this.id))
      .subscribe({

        next: (c) => {

          this.cours.set(c);

        },

        error: () => {

          this.erreur.set(
            'Ce cours est introuvable.'
          );

        }

      });

  }


  get nom() {
    return this.form.controls.nom;
  }


  get email() {
    return this.form.controls.email;
  }


  get telephone() {
    return this.form.controls.telephone;
  }


  get niveau() {
    return this.form.controls.niveau;
  }


  get motivation() {
    return this.form.controls.motivation;
  }


  get conditions() {
    return this.form.controls.conditions;
  }


  envoyer() {

    // Récupérer la valeur du signal
    const cours = this.cours();


    // Vérifier le formulaire et le cours
    if (this.form.invalid || !cours) {

      this.form.markAllAsTouched();

      return;

    }


    // Récupérer les valeurs du formulaire
    const v = this.form.getRawValue();


    // Indiquer que l'envoi est en cours
    this.envoiEnCours.set(true);

    this.erreur.set('');
    this.confirmation.set('');


    // Envoyer l'inscription à l'API
    this.inscriptions
      .ajouter({

        coursId: cours.id,

        nom: v.nom ?? '',

        email: v.email ?? '',

        niveau: v.niveau ?? '',

        date: new Date().toISOString()

      })
      .subscribe({

        next: () => {

          this.confirmation.set(
            `Merci ${v.nom} ! Votre inscription à « ${cours.titre} » est enregistrée.`
          );

          this.form.reset();

          this.envoiEnCours.set(false);

        },

        error: () => {

          this.erreur.set(
            "L'inscription a échoué. Réessayez dans un instant."
          );

          this.envoiEnCours.set(false);

        }

      });

  }

}