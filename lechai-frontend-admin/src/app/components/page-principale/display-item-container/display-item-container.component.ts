import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { URLParserService } from '../../../urlparser.service';
import { APICallerService } from '../../../apicaller.service';
import { ActivatedRoute } from '@angular/router';
import { Entryies, ObjectEntry } from '../../../generalInterfaces';
import { FilterResume, ParamAffectedResume, ParamInfoResume, RouteResumeBundle } from '../../../DisplayItemsInterfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription, VirtualTimeScheduler } from 'rxjs';
import { ValidatorResume } from 'src/app/validators';
import { validate } from 'src/app/validators';

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
  baseValues:{[Key:string]:object} | null = null
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
  hasError: boolean = false;



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


  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      // Handle changes to myInput here
      console.log('myInput has changed:', changes);
    }
  }

  makeInit(){
    if (this.dataSubscription)
      this.dataSubscription.unsubscribe()

    switch (this.ContainerType) {
      case ItemContainerTypes.SingleFunction:
        this.baseValues = {}
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
              Object.keys(this.Ids!).forEach(key => this.paramsValue[key] = this.Ids![key])
            });
        break;

      case ItemContainerTypes.Filters:
        if (this.filterSubscription)
          this.filterSubscription.unsubscribe()


        this.dataSubscription = this.caller.Get<ParamInfoResume[]>({}, `/${this.ControllerName}/Info/Filters`)
            .subscribe(data => {
              this.DisplayItemInfos = data.sort(item => item.ind)

              this.filterSubscription = this.URLParser.GetSubscription("filters", this.route, false).subscribe(data => {
                this.baseValues = data
                Object.keys(this.baseValues!).forEach(key => this.paramsValue[key]=this.baseValues![key])
                this.pushParams();
              });
            })
        break;
    }

  }
  updateFilter(valuePairs : Entryies, paramInfo : ParamInfoResume)
  {
    this.hasError = paramInfo.paramAffecteds.some(param => !this.checkValidators(param, Array.isArray(valuePairs)? valuePairs.find(pair => {console.log(param); return pair.key == param.name;})?.value : valuePairs.value ))

    if(this.hasError)
    {
      return
    }

    if (Array.isArray(valuePairs))
      valuePairs.forEach(valuePair => this.updateObjectPair(valuePair))
    else
      this.updateObjectPair(valuePairs)

    if(this.ContainerType==ItemContainerTypes.Filters)
      this.pushParams()
  }

  checkValidators(param: ParamAffectedResume, value: any):boolean
  {
    let everythingOk:boolean = true;

    if(param.isRequired && !(param.hasValue = value != null))
    {
      return false
    }

    for(let validator of param.validators)
    {

      if(validator.hasError = !validate(validator, value))
      {
        everythingOk = false
      }
    }

    return everythingOk
  }

  paramHasError(paramInfo: ParamInfoResume )
  {
    let errorString: string[] = []
    paramInfo.paramAffecteds.forEach(param => {
      if(param.isRequired && param.hasValue === false)
      {
        errorString.push(param.name + " est requis");
      }
      param.validators.forEach(validator => { if(validator.hasError) errorString.push(validator.message)})
    })
    return errorString
  }

  currentAffectedVarValues(paramName:string, extentionName?: string) : ObjectEntry[]
  {
    let varValue = []
    const paramInfo = this.DisplayItemInfos.find(paramInfo => paramInfo.name === paramName)

/*     console.log(paramName)
    console.log(this.baseValues)
    console.log(paramInfo)
    console.log(extentionName) */

    if (paramInfo)
      return paramInfo.paramAffecteds.map(affected => {return {key : (extentionName ? paramName + extentionName : affected.name) , value: this.baseValues![affected.name]}});

    return [{ key: paramName+(extentionName??""), value: null }];
  }
  currentAffectedVarValue(paramName:string, extentionName?: string) : ObjectEntry
  {
    return this.currentAffectedVarValues(paramName, extentionName)[0];
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
    if(this.hasError)
      return

    this.params.emit(this.paramsValue);
  }
  pushCancel()
  {
    this.params.emit(null)
  }
  pushRoute(route : RouteResumeBundle)
  {
    if(this.hasError)
      return

    this.params.emit([this.paramsValue, route.route.name, route.route.routeType])
  }
  paramsByDisplayName() : FilterResume[]
  {
    return this.DisplayItemInfos.filter(itemInfo => itemInfo.paramAffecteds.some(affected => affected.name in this.paramsValue))
      .map(itemInfo => {return {name : itemInfo.name, type : itemInfo.showTypeID, params : (itemInfo.showValue ? [itemInfo.showValue] : itemInfo.paramAffecteds
        .map(affected => affected.name in this.paramsValue ? this.paramsValue[affected.name] : null))}})
  }


}
