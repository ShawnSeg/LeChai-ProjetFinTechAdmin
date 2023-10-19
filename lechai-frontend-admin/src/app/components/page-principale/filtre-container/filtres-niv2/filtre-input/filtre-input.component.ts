import { Component, Input, SimpleChanges } from '@angular/core';
import { ParamInfoResume } from 'src/Interface';

@Component({
  selector: 'app-filtre-input',
  templateUrl: './filtre-input.component.html',
  styleUrls: ['./filtre-input.component.scss']
})
export class FiltreInputComponent {

  @Input() filtre: ParamInfoResume = {
    name: '',
    isMain: false,
    description: '',
    placeholder: '',
    showTypeID: 0,
    ind: 0,
    paramAffecteds: []
  };

  forLabel: string = "";
  labelName: string = this.filtre.name;
  passType: string = "";
  classInput: string = "";
  placeholder: string = "testInput";


  ngOnChanges(changes: SimpleChanges) {
    if ('filtre' in changes) {
      const newValue = changes['filtre'].currentValue;
      //console.log(newValue); // Log the updated filtre when it changes.
    }
  }


}
