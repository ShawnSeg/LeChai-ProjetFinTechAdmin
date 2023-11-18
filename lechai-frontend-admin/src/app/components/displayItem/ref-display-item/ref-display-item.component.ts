import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DisplayItemTemplate } from '../../page-principale/display-item-container/display-item-container.component';
import { ParamInfoResume, defaultParamInfo } from '../../../DisplayItemsInterfaces';
import { Entryies, ObjectEntry } from '../../../generalInterfaces';

@Component({
  selector: 'app-ref-display-item',
  templateUrl: './ref-display-item.component.html',
  styleUrls: ['./ref-display-item.component.scss']
})
export class RefDisplayItemComponent implements OnInit {
  @Input() valuePairs : {[key:string]:any} = {};
  @Output() push = new EventEmitter();
  @Input() paramInfoResume: ParamInfoResume = defaultParamInfo();
  refController : string = ""
  preFilters : {[key:string]:any} = {}
  constructor() {}
  ngOnInit(): void {
    let tempFilters:{[key:string]:any} = {}
    let baseParam = this.paramInfoResume.mapper?.baseParameters;

    console.log(this.valuePairs)
    if (baseParam)
      Object.keys(baseParam).forEach(key => tempFilters[key] = baseParam![key])
    let linkParam = this.paramInfoResume.mapper?.parametersToLink;
    if (linkParam)
      Object.keys(linkParam).forEach(key => tempFilters[key] = this.valuePairs[linkParam![key]])
    this.refController = this.paramInfoResume.mapper?.refController!
    this.preFilters = tempFilters;
  }
  updateValue(value : string)
  {
  }
  pushValue()
  {
  }

  getValuePairs()
  {
    return this.valuePairs[this.paramInfoResume.name];
  }
}
