import { Component, Input } from '@angular/core';
import { ParamInfoResume } from 'src/shawnInterface';

@Component({
  selector: 'app-filtre-min-max',
  templateUrl: './filtre-min-max.component.html',
  styleUrls: ['./filtre-min-max.component.scss']
})
export class FiltreMinMaxComponent {

  @Input() filtre?:ParamInfoResume

  forLabel: string = "";
  labelName: string = this.filtre?.name!;
  passType: string = "";
  classInput: string = "";
  minValue: number = 0.00;
  maxValue:number = 100.00;
}
