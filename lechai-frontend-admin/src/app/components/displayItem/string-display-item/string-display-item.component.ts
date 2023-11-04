import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DisplayItemTemplate } from '../../page-principale/display-item-container/display-item-container.component';
import { Entryies, ObjectEntry } from '../../../generalInterfaces';
import { ParamInfoResume, defaultParamInfo } from '../../../DisplayItemsInterfaces';

@Component({
  selector: 'app-string-display-item',
  templateUrl: './string-display-item.component.html',
  styleUrls: ['./string-display-item.component.scss']
})
export class StringDisplayItemComponent implements OnInit, DisplayItemTemplate {
  @Input() valuePairs : ObjectEntry = { key: '', value: null };
  @Output() push = new EventEmitter();
  @ViewChild('inputValue') input! : ElementRef;
  @Input() paramInfoResume: ParamInfoResume = defaultParamInfo();
  constructor() {}
  ngOnInit(): void {
    /* console.log(this.paramInfoResume) */
  }
  ngAfterViewInit() {
    if (this.valuePairs.value != null)
      this.input.nativeElement.value = this.valuePairs.value;
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

  isRequired(){
    console.log(this.paramInfoResume)
    this.paramInfoResume.paramAffecteds[0].validators.some(validator => validator.validatorTypeID == 1 )

/*     this.paramInfoResume.paramAffecteds.some(paramAffected => paramAffected.isRequired);
 */  }
}
