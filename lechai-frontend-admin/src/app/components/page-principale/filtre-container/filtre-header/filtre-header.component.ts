import { Component, ElementRef, ViewChild } from '@angular/core';
import { FiltresValuesService } from 'src/app/services/filtres-values.service';

@Component({
  selector: 'app-filtre-header',
  templateUrl: './filtre-header.component.html',
  styleUrls: ['./filtre-header.component.scss']
})
export class FiltreHeaderComponent {
  @ViewChild('fleche', { static: true }) fleche?: ElementRef;

  constructor(private filtreValues:FiltresValuesService){}



  toggleHide() {

    const fleche = this.fleche?.nativeElement as HTMLElement;

    if(fleche)
    {
      if (fleche.classList.contains('rotate-image')) {
        fleche.classList.remove('rotate-image');
        fleche.classList.add('rotate-image2');
        this.filtreValues.setIsHide(true)

      } else if (fleche.classList.contains('rotate-image2')) {
        fleche.classList.add('rotate-image');
        fleche.classList.remove('rotate-image2');
        this.filtreValues.setIsHide(false)

      } else {
        fleche.classList.add('rotate-image');
        this.filtreValues.setIsHide(false)
      }
    }

}
}
