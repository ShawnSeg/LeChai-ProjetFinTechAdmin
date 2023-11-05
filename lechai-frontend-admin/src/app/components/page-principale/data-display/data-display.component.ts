import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { URLParserService } from '../../../urlparser.service';
import { ActivatedRoute } from '@angular/router';

import { RouteTypes } from '../../../apicaller.service';
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
  ControllerName = "";
  @Input() refControlleur = "";
  @ViewChild("selectedDetail") selectedDetailElem? : ElementRef;
  @Input() filters? : {[key:string]:any};
  IdsNames:string[] = []
  selectedFunction? : RouteResumeBundle
  functions: RouteResumeBundle[] = []
  Proprieties: ParamInfoResume[] = []
  proprietiesResum: ProprietyResume[] = [];
  dataDisplay:{[key:string]:any}[] = []
  indexSetter:boolean = true
  currentInfos : {Ids:{[key:string]:any}, Index:number, detailOpened:boolean}[] = []
  ItemContainerTypes = ItemContainerTypes;
  RouteDisplayTypes = RouteDisplayTypes
  paramsSubscription : Subscription | undefined;
  dataSubscription : Subscription | undefined;
  paramInfoSubscription : Subscription | undefined;
  functionsSubscription : Subscription | undefined;
  subscribed = false;
  isRowChecked: boolean[] = [];
  checkedItems: ObjectEntry = { key: 'Ids', value: this.isRowChecked };

  constructor(private URLParser: URLParserService, private caller: APICallerService, private route : ActivatedRoute, private toast:ToastService) {}
  ngOnInit() {

    if(!this.refControlleur)
      {this.URLParser.GetControlleurSub(this.route).subscribe(name => {
        console.log(this.ControllerName);
        if(this.ControllerName != name)
        {
          this.ControllerName = name;
          this.makeInit();
          this.setFilters({});
          console.log("subscribe")
        }
      })
    }
    else
    {
      this.ControllerName = this.refControlleur;
      this.indexSetter = false;
      this.makeInit()
    }
  }

    makeInit(){

    this.selectedFunction = undefined;

    if (this.functionsSubscription)
          this.functionsSubscription.unsubscribe()
    this.functionsSubscription = this.caller.Get<RouteResumeBundle[]>({}, this.ControllerName, "Info/Routes")
      .subscribe(data => {
        this.functions = data
        this.functions.forEach(fonction => fonction.paramsInfo = fonction.paramsInfo.sort(item => item.ind))
      });


    if (this.paramInfoSubscription)
          this.paramInfoSubscription.unsubscribe()
    this.paramInfoSubscription = this.caller.Get<ParamInfoResume[]>({}, this.ControllerName, "Info/Proprieties")
      .subscribe(data => {
        this.Proprieties = data.sort(item => item.ind);
        this.proprietiesResum = this.Proprieties.filter(prop => prop.isMain).map(prop => ({
          name:prop.name,
          showTypeID: prop.showTypeID,
          params: prop.paramAffecteds.map(varsAffected => varsAffected.name)
        }));


        this.IdsNames = this.Proprieties.filter(prop => [7,8].includes(prop.showTypeID)).map(prop => prop.paramAffecteds[0].name);
        //this.URLParser.GetSubscription("selected", this.route, false).subscribe(tempCurrent => this.setSelected(tempCurrent as number[][] ?? []));

      });

      if(this.refControlleur)
/*         this.URLParser.getFilters().subscribe(filters => this.setFilters(filters))
      else */
        this.setFilters(this.filters!)
  }

  setFilters(filters: {[key:string]:any})
  {
    if(!this.ControllerName)
      return

    if (this.dataSubscription)
      this.dataSubscription.unsubscribe()

    this.dataSubscription = this.caller.Get<{[key:string]:any}[]>(filters, this.ControllerName, "GetAll")
    .subscribe(data => {
      this.dataDisplay = data;
      if (this.indexSetter)
        this.setIndex()
    });
  }

  getData(params : {[key:string]:any}, setIndex : boolean){
    if (this.dataSubscription)
      this.dataSubscription.unsubscribe()
    this.dataSubscription = this.caller.Get<{[key:string]:any}[]>(params, this.ControllerName, "GetAll")
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
    /* if(isForOpenedDetail)
      this.URLParser.ChangeURL("selected", this.currentInfos.map(info => info.Ids), this.route); */
  }
  checkIndex(i:number, isForDetail:boolean) : boolean
  {
    return this.currentInfos.some(info => info.Index == i && (!isForDetail||info.detailOpened ));
  }
  currentInfosIds(i : number)
  {
    return this.currentInfos.find(info => info.Index == i)?.Ids;
  }
  getRouteByType(routeType : RouteDisplayTypes)
  {
    return this.functions.filter(funct => funct.route.routeDisplayType == routeType)
  }
  toggleFunction(funct: RouteResumeBundle) {
    if (this.selectedFunction === funct) {
      this.selectedFunction = undefined;
      this.toggleModalOverlayBackground(false);
      return;
    }
    this.selectedFunction = funct;
    this.toggleModalOverlayBackground(true);
  }
  checkAllItems(event: boolean) {
    this.dataDisplay.forEach((item,i)=>this.toggleSelected(i, item, false, event))
  }

  getCurrentInfo()
  {
    return this.currentInfos.map(info=>info.Ids)
  }
  executeFunction(params:{[key:string]:any}|null, routeName:string, routeType:RouteTypes){
    this.selectedFunction = undefined;
    if(params == null)
      return

    this.caller.CallAPI(routeType,params,this.ControllerName,routeName).subscribe({
      next:(data:any)=>{
        this.toast.showToast("success", data+" lignes d'affectées!", "bottom-center", 4000)
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error.status)
        this.toast.showToast("error", "Erreur", "bottom-center", 4000)
      }
    })

  }


  closeDisplayItemContainer() {
    this.selectedFunction = undefined;

    // Remove the transition effect when going back to the normal state
    this.toggleModalOverlayBackground(false);
  }

  toggleModalOverlayBackground(isDarker: boolean) {
    // Delay the background color change using a timeout
    setTimeout(() => {
      const modalOverlay = document.querySelector('.modal-overlay') as HTMLElement;
      if (modalOverlay) {
        modalOverlay.style.animationName = isDarker ? 'none' : 'fadeOut';
        modalOverlay.style.backgroundColor = isDarker ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)';
      }
    });
  }
}
