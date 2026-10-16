
import { Pipe, PipeTransform } from '@angular/core';
import { Cours } from '../composants/liste-cours/liste-cours';

@Pipe({
  name: 'filtreCours',
  standalone: true
})
export class FiltreCoursPipe implements PipeTransform {

  transform(cours: Cours[], recherche: string): Cours[] {
    if (!recherche) return cours;

    const q = recherche.toLowerCase();

    return cours.filter(c =>
      c.titre.toLowerCase().includes(q)
    );
  }
}
