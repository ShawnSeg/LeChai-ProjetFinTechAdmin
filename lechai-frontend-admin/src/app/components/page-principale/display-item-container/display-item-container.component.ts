import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { URLParserService } from '../../../urlparser.service';
import { APICallerService } from '../../../apicaller.service';
import { ActivatedRoute } from '@angular/router';
import { Entryies, ObjectEntry } from '../../../generalInterfaces';
import { FilterResume, ParamInfoResume, RouteResumeBundle } from '../../../DisplayItemsInterfaces';
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
  ItemContainerTypes = ItemContainerTypes;
  @Output() params = new EventEmitter();
  baseValues:{[Key:string]:object} = {}
  paramsValue:{[Key:string]:object} = {}
  ControllerName = "";
  @Input() refControlleur = "";
  @Input() ContainerType? : ItemContainerTypes;
  @Input() Ids? :{[Key:string]:object}
/*   @Input() Proprieties? : ParamInfoResume[] */
  //@Input() multipleIds?: {[Key:string]:object}[]=[]
  @Input() Routes : RouteResumeBundle[] = []
  filterSubscription : Subscription | undefined
  propSubscription : Subscription | undefined
  dataSubscription : Subscription | undefined
  @Input() DisplayItemInfos : ParamInfoResume[] = []

  ngOnInit()
  {
    console.log(this.DisplayItemInfos)

    if(!this.refControlleur)
      {this.URLParser.GetControlleurSub(this.route).subscribe(name => {

        if(this.ControllerName != name)
        {
          this.ControllerName = name;
          this.makeInit();
          console.log("subscribe")
        }
      })
    }
    else
    {
      this.ControllerName = this.refControlleur;
      this.makeInit()
    }
  }

  makeInit(){
    if (this.dataSubscription)
      this.dataSubscription.unsubscribe()

    switch (this.ContainerType) {
      case ItemContainerTypes.SingleFunction:
        /* this.DisplayItemInfos = this.Proprieties!.sort(item => item.ind) */
        break;
      case ItemContainerTypes.Proprieties:
        if (this.propSubscription)
          this.propSubscription.unsubscribe()

        if (!!this.Ids)
          this.propSubscription = this.caller.Get<{[key:string]:any}>(this.Ids, this.ControllerName, "GetDetailed")
            .subscribe(data => {
              this.baseValues = data;
             /*  this.DisplayItemInfos = this.Proprieties!.sort(item => item.ind); */
              //Object.keys(this.Ids!).forEach(key => this.baseValues[key] = this.Ids![key])
            });
        break;

      case ItemContainerTypes.Filters:
        if (this.filterSubscription)
          this.filterSubscription.unsubscribe()

        this.filterSubscription = this.URLParser.GetSubscription("filters", this.route, false).subscribe(data => {
          this.baseValues = data
          Object.keys(this.baseValues).forEach(key => this.paramsValue[key]=this.baseValues[key])
        });
        this.dataSubscription = this.caller.Get<ParamInfoResume[]>({}, `/${this.ControllerName}/Info/Filters`)
            .subscribe(data => this.DisplayItemInfos = data.sort(item => item.ind))
        break;
    }

  }
  updateFilter(valuePairs : Entryies)
  {
    if (Array.isArray(valuePairs))
      valuePairs.forEach(valuePair => this.updateObjectPair(valuePair))
    else
      this.updateObjectPair(valuePairs)

    if(this.ContainerType==ItemContainerTypes.Filters)
      this.pushParams()
  }
  currentAffectedVarValues(paramName:string) : ObjectEntry[]
  {
    const paramInfo = this.DisplayItemInfos.find(paramInfo => paramInfo.name === paramName)
    if (paramInfo)
      return paramInfo.paramAffecteds.map(affected => {return {key : affected.name, value: this.baseValues[affected.name]}});
    return [{ key: paramName, value: null }];
  }
  currentAffectedVarValue(paramName:string) : ObjectEntry
  {
    return this.currentAffectedVarValues(paramName)[0] ;
  }

  intermediaire(param: ParamInfoResume)
  {
    return this.currentAffectedVarValue(param.name)
  }

  updateObjectPair(valuePairs : ObjectEntry)
  {
    if (valuePairs.value == null)
      delete this.paramsValue[valuePairs.key];
    else
      this.paramsValue[valuePairs.key] = valuePairs.value;
  }
  pushParams()
  {
    this.params.emit(this.paramsValue);
  }
  pushCancel()
  {
    this.params.emit(null)
  }
  pushRoute(route : RouteResumeBundle)
  {
    this.params.emit([this.paramsValue, route.route.name, route.route.routeType])
  }
  paramsByDisplayName() : FilterResume[]
  {
    return this.DisplayItemInfos.filter(itemInfo => itemInfo.paramAffecteds.some(affected => affected.name in this.paramsValue))
      .map(itemInfo => {return {name : itemInfo.name, type : itemInfo.showTypeID, params : itemInfo.paramAffecteds
        .map(affected => affected.name in this.paramsValue ? this.paramsValue[affected.name] : null)}})
  }
}
