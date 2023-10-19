import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-filtre-header',
  templateUrl: './filtre-header.component.html',
  styleUrls: ['./filtre-header.component.scss']
})
export class FiltreHeaderComponent {
  @ViewChild('fleche', { static: true }) fleche?: ElementRef;
  toggleHide() {

    const fleche = this.fleche?.nativeElement as HTMLElement;

    if(fleche)
    {
      if (fleche.classList.contains('rotate-image')) {
        fleche.classList.remove('rotate-image');
        fleche.classList.add('rotate-image2');

      } else if (fleche.classList.contains('rotate-image2')) {
        fleche.classList.add('rotate-image');
        fleche.classList.remove('rotate-image2');

      } else {
        fleche.classList.add('rotate-image');

      }
    }

}
}
