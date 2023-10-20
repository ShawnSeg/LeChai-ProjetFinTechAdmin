import { Component, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { ParamInfoResume } from 'src/shawnInterface';

@Component({
  selector: 'app-filtre-resume',
  templateUrl: './filtre-resume.component.html',
  styleUrls: ['./filtre-resume.component.scss']
})
export class FiltreResumeComponent {
  @Input() filtres?:ParamInfoResume[]

  ngOnInit(){
    console.log(this.filtres)
  }
  ngOnChanges(changes:SimpleChanges){
    if ('filtres' in changes) {
      const newValue = changes['filtres'].currentValue;
      console.log(newValue); // Log the updated filtres when it changes.
      this.filtres = newValue;

    }
  }
}
