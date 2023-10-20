import { Component, Input, SimpleChanges } from '@angular/core';
import { ParamInfoResume } from 'src/shawnInterface';

@Component({
  selector: 'app-filtre-input',
  templateUrl: './filtre-input.component.html',
  styleUrls: ['./filtre-input.component.scss']
})
export class FiltreInputComponent {

  @Input() filtre?: ParamInfoResume

  forLabel: string = "";
  labelName: string = "";
  passType: string = "";
  classInput: string = "";
  placeholder: string = "testInput";


 ngOnInit(){

 }


}
