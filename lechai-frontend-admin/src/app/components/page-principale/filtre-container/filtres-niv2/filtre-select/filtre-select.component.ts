import { Component, Input } from '@angular/core';
import { ParamInfoResume } from 'src/Interface';

@Component({
  selector: 'app-filtre-select',
  templateUrl: './filtre-select.component.html',
  styleUrls: ['./filtre-select.component.scss']
})
export class FiltreSelectComponent {

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
  labelName: string = this.filtre?.name||"";

  valueAll: string = "0";
  all: string = "Tout";

  ngOnInit(){
    //console.log(this.filtre)
  }
}
