import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DisplayItemTemplate } from '../../page-principale/display-item-container/display-item-container.component';
import { Entryies, ObjectEntry } from '../../../generalInterfaces';
import { ParamInfoResume, defaultParamInfo } from '../../../DisplayItemsInterfaces';

@Component({
  selector: 'app-check-box-display-item',
  templateUrl: './check-box-display-item.component.html',
  styleUrls: ['./check-box-display-item.component.scss']
})
export class CheckBoxDisplayItemComponent implements OnInit, DisplayItemTemplate {
  @Input() valuePairs : ObjectEntry = { key: '', value: null };
  @Output() push = new EventEmitter();
  @ViewChild('inputValue') input! : ElementRef;
  @Input() paramInfoResume: ParamInfoResume = defaultParamInfo();
  @Input() isUpdatable: boolean = false;
  constructor() {}
  ngOnInit(): void {

  }
  ngAfterViewInit() {
    if (this.valuePairs.value != null)
      this.input.nativeElement.checked = (!!this.valuePairs.value);

    if (this.valuePairs.value == undefined)
      this.updateValue(false)

  }
  updateValue(value : boolean)
  {
    this.valuePairs.value = value ? 1 : 0;

    this.pushValue();
  }
  pushValue()
  {
    this.push.emit(this.valuePairs);
  }

  isRequired(){
    this.paramInfoResume.paramAffecteds[0].validators.some(validator => validator.validatorTypeID == 1 )

/*     this.paramInfoResume.paramAffecteds.some(paramAffected => paramAffected.isRequired);
 */  }

}
