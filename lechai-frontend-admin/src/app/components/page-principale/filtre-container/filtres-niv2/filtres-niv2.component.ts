import { Component, Input, SimpleChanges } from '@angular/core';
import { ParamInfoResume } from 'src/shawnInterface';

@Component({
  selector: 'app-filtres-niv2',
  templateUrl: './filtres-niv2.component.html',
  styleUrls: ['./filtres-niv2.component.scss']
})
export class FiltresNiv2Component {
  @Input() filtres: ParamInfoResume[]=[]

  ngOnChanges(changes: SimpleChanges) {
    if ('filtres' in changes) {
      const newValue = changes['filtres'].currentValue;
      console.log(newValue); // Log the updated filtres when it changes.
      this.filtres = newValue;
    }
  }

}
