import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { URLParserService } from '../urlparser.service';
import { APICallerService } from '../apicaller.service';
import { ActivatedRoute } from '@angular/router';
import { Entryies, ObjectEntry } from '../generalInterfaces';
import { FilterResume, ParamInfoResume } from '../DisplayItemsInterfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

export enum ItemContainerTypes {
  Proprieties = 1,
  Filters = 2,
  SingleFunction = 3
}
export interface DisplayItemTemplate {
  valuePairs : Entryies,
  paramInfoResume : ParamInfoResume,
  push : EventEmitter<Entryies>,
  updateValue(value : any) : void;
  pushValue() : void;
}
@Component({
  selector: 'app-display-item-container',
  templateUrl: './display-item-container.component.html',
  styleUrls: ['./display-item-container.component.scss']
})
export class DisplayItemContainerComponent implements OnInit {
  constructor(private URLParser : URLParserService, private caller:APICallerService, private route : ActivatedRoute) {}
  @Output() params = new EventEmitter();
  @Input() paramsValue:{[Key:string]:object} = {}
  _ControllerName:string = "";
  @Input() RouteName = "";
  @Input() ContainerType? : ItemContainerTypes;
  @Input() Ids? :{[Key:string]:object}
  @Input() Proprieties? : ParamInfoResume[]
  filterSubscription : Subscription | undefined
  dataSubscription : Subscription | undefined
  @Input()
  set ControllerName(name : string)
  {
    this._ControllerName = name;
    this.setProprieties();
  }
  DisplayItemInfos : ParamInfoResume[] = []
  ngOnInit()
  {
  }

  setProprieties() {
    if (this.dataSubscription)
      this.dataSubscription.unsubscribe()
    if (this.Proprieties != undefined){
      this.setProprietiesStatic(this.Proprieties, this.Ids)
      return;
    }
    if (this.ContainerType == ItemContainerTypes.Filters)
    {
      if (this.filterSubscription)
        this.filterSubscription.unsubscribe()
      this.filterSubscription = this.URLParser.GetSubscription("filters", this.route, false).subscribe(data => this.paramsValue = data);
    }
    let urlPath :string = this.switchCaseContainerType();

    this.dataSubscription = this.caller.Get<ParamInfoResume[]>({}, urlPath)
        .subscribe(data => this.DisplayItemInfos = data.sort(item => item.ind))
  }
  setProprietiesStatic(Proprieties : ParamInfoResume[], Ids? :{[Key:string]:object}) {
    if (!!Ids)
      this.caller.Get<{[key:string]:any}>(Ids, this._ControllerName, "GetDetailed")
        .subscribe(data => {this.paramsValue = data; this.DisplayItemInfos = Proprieties!});
  }
  switchCaseContainerType()
  {
    switch (this.ContainerType) {
      case ItemContainerTypes.Filters:
        return `/${this._ControllerName}/Info/Filters`;
      case ItemContainerTypes.Proprieties:
        return `/${this._ControllerName}/Info/Proprieties`;
      case ItemContainerTypes.SingleFunction:
        return `/${this._ControllerName}/InfoRoute/${this.RouteName}`;
      default:
        return '';
    }
  }
  updateFilter(valuePairs : Entryies)
  {
    if (Array.isArray(valuePairs))
      valuePairs.forEach(valuePair => this.updateObjectPair(valuePair))
    else
      this.updateObjectPair(valuePairs)
    this.pushParams()
  }
  currentAffectedVarValues(paramName:string) : ObjectEntry[]
  {
    const paramInfo = this.DisplayItemInfos.find(paramInfo => paramInfo.name === paramName)
    if (paramInfo)
      return paramInfo.paramAffecteds.map(affected => {return {key : affected.name, value: this.paramsValue[affected.name]}});
    return [{ key: paramName, value: null }];
  }
  currentAffectedVarValue(paramName:string) : ObjectEntry
  {
    return this.currentAffectedVarValues(paramName)[0] ;
  }
  updateObjectPair(valuePairs : ObjectEntry)
  {
    if (valuePairs.value == null)
    {
      delete this.paramsValue[valuePairs.key];
      return;
    }
    this.paramsValue[valuePairs.key] = valuePairs.value;
  }
  pushParams()
  {
    this.params.emit(this.paramsValue);
  }
  paramsByDisplayName() : FilterResume[]
  {
    return this.DisplayItemInfos.filter(itemInfo => itemInfo.paramAffecteds.some(affected => affected.name in this.paramsValue))
      .map(itemInfo => {return {name : itemInfo.name, type : itemInfo.showTypeID, params : itemInfo.paramAffecteds
        .map(affected => affected.name in this.paramsValue ? this.paramsValue[affected.name] : null)}})
  }
}
