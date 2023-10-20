import { Component, ElementRef, ViewChild, Input, SimpleChanges} from '@angular/core';
import { FiltresValuesService } from 'src/app/services/filtres-values.service';
import { ParamInfoResume } from 'src/shawnInterface';

@Component({
  selector: 'app-filtre-header',
  templateUrl: './filtre-header.component.html',
  styleUrls: ['./filtre-header.component.scss']
})
export class FiltreHeaderComponent {
  @ViewChild('fleche', { static: true }) fleche?: ElementRef;

  @Input() filtres?:ParamInfoResume[]

  constructor(private filtreValues:FiltresValuesService){}

  ngOnInit(){
    console.log(this.filtres)
  }
  ngOnChanges(changes: SimpleChanges) {
    /* if ('nomPageControlleur' in changes) {
       const newValue = changes['nomPageControlleur'].currentValue;
       console.log(newValue); // Log the updated filtres when it changes.
       this.nomPageControlleur = newValue;
       this.callRoutingService(newValue);
     */
     if ('filtres' in changes) {
       const newValue = changes['filtres'].currentValue;
       console.log(newValue); // Log the updated filtres when it changes.
       this.filtres = newValue;

     }
   }

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
