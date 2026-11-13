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
    @Output() coursSelectionne = new EventEmitter<Cours>(); 
    coursActif: Cours | null = null; 
    recherche = '';
    tri: 'asc' | 'desc' = 'asc';
    cours: Cours[] = [];
    private catalogue = inject(Catalogue);

    constructor() {
        this.cours = this.catalogue.lister();
    }

    selectionner(c: Cours) { 
      this.coursActif = c; 
      this.coursSelectionne.emit(c); 
    } 
  

}


