import { Component, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ParamInfoResume } from 'src/Interface';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

interface filtreNameValue{
  name:string,
  value:string
}

@Component({
  selector: 'app-filtre-input',
  templateUrl: './filtre-input.component.html',
  styleUrls: ['./filtre-input.component.scss']
})
export class FiltreInputComponent {

  @Input() filtre?: ParamInfoResume
  @Output() filtreChange = new EventEmitter<filtreNameValue>();

  forLabel: string = "";
  labelName: string = "";
  passType: string = "";
  classInput: string = "";
  placeholder: string = "testInput";

  controllerName:string=""

  constructor(private route:ActivatedRoute, private router:Router){}


  ngOnInit(){

}

  onChange(name:string,value:string){

    this.filtreChange.emit({name:name, value:value})
  }

}
