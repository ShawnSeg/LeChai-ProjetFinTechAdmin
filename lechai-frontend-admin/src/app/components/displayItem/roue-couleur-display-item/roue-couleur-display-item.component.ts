import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { DisplayItemTemplate } from '../../page-principale/display-item-container/display-item-container.component';
import { Entryies, ObjectEntry } from '../../../generalInterfaces';
import { ParamInfoResume, defaultParamInfo } from '../../../DisplayItemsInterfaces';

@Component({
  selector: 'app-roue-couleur-display-item',
  templateUrl: './roue-couleur-display-item.component.html',
  styleUrls: ['./roue-couleur-display-item.component.scss']
})
export class RoueCouleurDisplayItemComponent implements OnInit, DisplayItemTemplate {
  backgroundColor: string = '';
  @Input() valuePairs : ObjectEntry = { key: '', value: null };
  @Output() push = new EventEmitter();
  @ViewChild('inputValue') input? : ElementRef;
  @Input() paramInfoResume: ParamInfoResume = defaultParamInfo();
  @Input() isUpdatable: boolean = false;
  @Input() set baseParam(value: ObjectEntry)
  {
    this.valuePairs = value

    if(this.input)
      this.updateBaseValue();

  }

  constructor() {}
  ngOnInit(): void {
    /* console.log(this.paramInfoResume) */
  }
  ngAfterViewInit() {

    this.updateBaseValue()
  }

  updateBaseValue(){
    if(this.valuePairs.value != null)
      this.input!.nativeElement.value = this.valuePairs.value
  }

  updateValue(value : string)
  {
    if (!value)
      this.valuePairs.value = null;
    else
      this.valuePairs.value = value;
    this.pushValue();
  }
  pushValue()
  {

    this.push.emit(this.valuePairs);
  }


}
