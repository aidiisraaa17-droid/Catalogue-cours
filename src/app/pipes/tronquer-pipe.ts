import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'tronquer',
  standalone: true
})
export class TronquerPipe implements PipeTransform {

  transform(texte: string, longueur: number = 20): string {
    if (texte.length <= longueur) {
      return texte;
    }

    return texte.substring(0, longueur) + '…';
  }
}
