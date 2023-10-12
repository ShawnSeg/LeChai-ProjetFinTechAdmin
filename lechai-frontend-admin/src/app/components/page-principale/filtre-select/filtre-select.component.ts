import { Component } from '@angular/core';

@Component({
  selector: 'app-filtre-select',
  templateUrl: './filtre-select.component.html',
  styleUrls: ['./filtre-select.component.scss']
})
export class FiltreSelectComponent {

  forLabel: string = "";
  labelName: string = "";

  valueAll: string = "0";
  all: string = "Tout";

}
