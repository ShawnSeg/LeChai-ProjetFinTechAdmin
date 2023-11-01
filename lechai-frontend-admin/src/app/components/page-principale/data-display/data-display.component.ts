import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { URLParserService } from '../../../urlparser.service';
import { ActivatedRoute } from '@angular/router';


import { ParamInfoResume, ProprietyResume, RouteDisplayTypes, RouteResume, RouteResumeBundle } from '../../../DisplayItemsInterfaces';
import { APICallerService } from '../../../apicaller.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ItemContainerTypes } from '../display-item-container/display-item-container.component';
import { ObjectEntry, toDictionary, toDictionarySimple } from '../../../generalInterfaces';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.scss']
})
export class DataDisplayComponent implements OnInit {
  @Input() _ControllerName = "";
  @Input()
  set ControllerName(name : string)
  {
    this._ControllerName = name;
    this.setProprieties();
  }
  @ViewChild("selectedDetail") selectedDetailElem? : ElementRef;
  IdsNames:string[] = []
  selectedFunction? : RouteResumeBundle
  functions: RouteResumeBundle[] = []
  Proprieties: ParamInfoResume[] = []
  proprietiesResum: ProprietyResume[] = [];
  dataDisplay:{[key:string]:any}[] = []
  filters : {[key:string]:any} = {}
  currentInfos : {Ids:{[key:string]:any}, Index:number, detailOpened:boolean}[] = []
  ItemContainerTypes = ItemContainerTypes;
  paramsSubscription : Subscription | undefined;
  dataSubscription : Subscription | undefined;
  paramInfoSubscription : Subscription | undefined;
  functionsSubscription : Subscription | undefined;
  subscribed = false;
  isRowChecked: boolean[] = [];
  checkedItems: ObjectEntry = { key: 'Ids', value: this.isRowChecked };
  @Input() preFilters? : {[key:string]:string}
  constructor(private URLParser: URLParserService, private caller: APICallerService, private route : ActivatedRoute, private toast:ToastService) {}
  ngOnInit() {
  }
  setProprieties()
  {
    if (this.functionsSubscription)
          this.functionsSubscription.unsubscribe()
    this.functionsSubscription = this.caller.Get<RouteResumeBundle[]>({}, this._ControllerName, "Info/Routes")
      .subscribe(data => this.functions = data);


    if (this.paramInfoSubscription)
          this.paramInfoSubscription.unsubscribe()
    this.paramInfoSubscription = this.caller.Get<ParamInfoResume[]>({}, this._ControllerName, "Info/Proprieties")
      .subscribe(data => {
        this.Proprieties = data.sort(item => item.ind);
        this.proprietiesResum = this.Proprieties.filter(prop => prop.isMain).map(prop => ({
          name:prop.name,
          showTypeID: prop.showTypeID,
          params: prop.paramAffecteds.map(varsAffected => varsAffected.name)
        }));


        this.IdsNames = this.Proprieties.filter(prop => [7,8].includes(prop.showTypeID)).map(prop => prop.paramAffecteds[0].name);
        //this.URLParser.GetSubscription("selected", this.route, false).subscribe(tempCurrent => this.setSelected(tempCurrent as number[][] ?? []));
        if (this.paramsSubscription)
          this.paramsSubscription.unsubscribe()
        if (this.preFilters)
        {
          this.getData(this.preFilters, false)
          return;
        }
        this.paramsSubscription = this.URLParser.GetSubscription("filters", this.route, true).subscribe(filters => {
          console.log(filters);
          this.filters = filters;
          this.getData(filters, true)
        });
      });
  }
  getData(params : {[key:string]:any}, setIndex : boolean){
    if (this.dataSubscription)
      this.dataSubscription.unsubscribe()
    this.dataSubscription = this.caller.Get<{[key:string]:any}[]>(params, this._ControllerName, "GetAll")
    .subscribe(data => {
      this.dataDisplay = data;
      if (setIndex)
        this.setIndex()
    });
  }
  setSelected(tempCurrent : number[][])
  {
    this.currentInfos = tempCurrent.map(value =>
      ({Ids: toDictionarySimple<string, number>(this.IdsNames, key => key, (key, i) => value[i]), Index:-1, detailOpened:false})
    );
    if (this.dataDisplay.length > 0)
      this.setIndex()
  }
  setIndex()
  {
    this.currentInfos.forEach(info =>
      info.Index = this.dataDisplay.findIndex(item => Object.keys(info.Ids).every(key => item[key] == info.Ids[key]))
    );
  }
  getValue(params : string[], item : {[key:string]:any})
  {
    return params.map(param => item[param]).join(', ');
  }
  toggleSelected(i : number, item :{[key:string]:any}, isForOpenedDetail:boolean, forceCheck?:boolean)
  {
    const index = this.currentInfos.findIndex(info => info.Index == i);
    if ( index > -1) {
      if(forceCheck===true)
        return
      this.currentInfos.splice(index, 1);
    }
    else
    {
      if(forceCheck===false)
        return
      const Ids = toDictionary(this.IdsNames, idName => idName, idName => item[idName]);
      this.currentInfos.push({Ids:Ids, Index:i, detailOpened:isForOpenedDetail});
    }
    if(isForOpenedDetail)
      this.URLParser.ChangeURL("selected", this.currentInfos.map(info => info.Ids), this.route);
  }
  checkIndex(i:number, isForDetail:boolean) : boolean
  {
    return this.currentInfos.some(info => info.Index == i && (!isForDetail||info.detailOpened ));
  }
  currentInfosIds(i : number)
  {
    return this.currentInfos.find(info => info.Index == i)?.Ids;
  }
  getMultipleRoute()
  {

    return this.functions.filter(funct => funct.route.routeDisplayType == RouteDisplayTypes.MULTIPLE)
  }
  toggleFunction(funct: RouteResumeBundle) {
    if (this.selectedFunction == funct)
    {
      this.selectedFunction = undefined
      return
    }
    this.selectedFunction = funct;
  }



  checkAllItems(event: boolean) {
    this.dataDisplay.forEach((item,i)=>this.toggleSelected(i, item, false, event))
  }

  getCurrentInfo()
  {
    return this.currentInfos.map(info=>info.Ids)
  }

  executeFunction(params:{[key:string]:any}|null, routeName:string, routeType:RouteTypes){
    if(params == null)
      return

    this.caller.CallAPI(routeType,params,this._ControllerName,routeName).subscribe({
      next:(data:any)=>{
        this.toast.showToast("success", data+" lignes d'affectées!", "bottom-center", 4000)
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error.status)
        this.toast.showToast("error", "Erreur", "bottom-center", 4000)
      }
    })

  }
}
