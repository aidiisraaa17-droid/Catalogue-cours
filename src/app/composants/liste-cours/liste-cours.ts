import { Component, Output, EventEmitter } from '@angular/core'; 
import { CommonModule, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FiltreCoursPipe } from '../../pipes/filtre-cours-pipe';
import { TriCoursPipe } from '../../pipes/tri-cours-pipe';
import { PlacesRestantesPipe } from '../../pipes/places-restantes-pipe';
import { TronquerPipe } from '../../pipes/tronquer-pipe';
export interface Cours {
  titre: string;
  categorie: string;
  duree: string;
  places: number;
}
@Component({
  selector: 'app-liste-cours',
  imports: [
    CommonModule,
    FormsModule,
    FiltreCoursPipe,
    TriCoursPipe,
    PlacesRestantesPipe,
    UpperCasePipe,
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
    cours: Cours[] = [ {
      titre: 'Angular avancé',
      categorie: 'Front-end',
      duree: '12h',
      places: 8
    },
    {
      titre: 'TypeScript pour développeurs',
      categorie: 'Langage',
      duree: '8h',
      places: 15
    },
    {
      titre: 'API REST avec Node.js',
      categorie: 'Back-end',
      duree: '16h',
      places: 6
    },
    {
      titre: 'Git et travail collaboratif',
      categorie: 'Outils',
      duree: '4h',
      places: 20
    } ]; 
    
    selectionner(c: Cours) { 
      this.coursActif = c; 
      this.coursSelectionne.emit(c); 
    } 
  ;

}


