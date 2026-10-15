import { Component, Input } from '@angular/core'; 
import { Cours } from '../liste-cours/liste-cours'; 
@Component({ 
selector: 'app-detail-cours',
standalone: true, 
templateUrl: './detail-cours.html', 
styleUrl: './detail-cours.css' })  
export class DetailCours { 
  @Input() cours: Cours | null = null; 
}  