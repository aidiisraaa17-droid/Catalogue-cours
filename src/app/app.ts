import { Component } from '@angular/core';

import { EnTete } from './composants/en-tete/en-tete';
import { ListeCours } from './composants/liste-cours/liste-cours';
import { PiedPage } from './composants/pied-page/pied-page';
import { DetailCours } from './composants/detail-cours/detail-cours';
import { Cours } from './composants/liste-cours/liste-cours';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    EnTete,
    ListeCours,
    PiedPage,
    DetailCours,
    
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

 
export class App { 
  coursSelectionne: Cours | null = null; 
  
  onSelectionCours(c: Cours) { 
    this.coursSelectionne = c; 
  } 
} 