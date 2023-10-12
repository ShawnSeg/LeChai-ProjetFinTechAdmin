import { Component } from '@angular/core';

@Component({
  selector: 'app-filtre-input',
  templateUrl: './filtre-input.component.html',
  styleUrls: ['./filtre-input.component.scss']
})
export class FiltreInputComponent {
  forLabel: string = "";
  labelName: string = "";
  passType: string = "";
  classInput: string = "";
  placeholder: string = "";

}
