import {
  Component,
  Input
} from '@angular/core';

import { RouterLink } from '@angular/router';

import {
  COURS,
  Cours
} from '../../donnees/cours';

import {
  DetailCours
} from '../../composants/detail-cours/detail-cours';
import { inject } from '@angular/core';
import { Catalogue } from '../../services/catalogue';
@Component({
  selector: 'app-page-detail',
  standalone: true,
  imports: [
    DetailCours,
    RouterLink,
    
    
  ],
  

  templateUrl: './page-detail.html',
  styleUrl: './page-detail.css'
})
export class PageDetail {
  private catalogue = inject(Catalogue);

  @Input()
  id = '';

  get cours(): Cours | undefined {

     return this.catalogue.trouver(Number(this.id));

  }

}