import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DisplayItemTemplate } from '../../page-principale/display-item-container/display-item-container.component';
import { Entryies, ObjectEntry } from '../../../generalInterfaces';
import { ParamInfoResume, defaultParamInfo } from '../../../DisplayItemsInterfaces';

@Component({
  selector: 'app-int-display-item',
  templateUrl: './int-display-item.component.html',
  styleUrls: ['./int-display-item.component.scss']
})
export class IntDisplayItemComponent implements OnInit, DisplayItemTemplate{
  @Input() valuePairs : ObjectEntry = { key: '', value: null };
  @Output() push = new EventEmitter();
  @ViewChild('inputValue') input! : ElementRef;
  @Input() paramInfoResume: ParamInfoResume = defaultParamInfo();
  @Input() isUpdatable: boolean = false;
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

}
