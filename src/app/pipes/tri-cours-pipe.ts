
import { Pipe, PipeTransform } from '@angular/core';

import { Cours } from '../composants/liste-cours/liste-cours';

@Pipe({
  name: 'triCours',
  standalone: true
})
export class TriCoursPipe implements PipeTransform {

  transform(cours: Cours[], sens: 'asc' | 'desc' = 'asc'): Cours[] {
    const copie = [...cours].sort(
      (a, b) => a.titre.localeCompare(b.titre)
    );

    return sens === 'desc' ? copie.reverse() : copie;
  }
}
