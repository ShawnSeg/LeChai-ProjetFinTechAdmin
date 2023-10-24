import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { URLParserService } from '../urlparser.service';
import { ActivatedRoute } from '@angular/router';
import { ParamInfoResume, ProprietyResume } from '../DisplayItemsInterfaces';
import { APICallerService } from '../apicaller.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ItemContainerTypes } from '../display-item-container/display-item-container.component';
import { toDictionary, toDictionarySimple } from '../generalInterfaces';
import { Subscription } from 'rxjs';

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
  Proprieties: ParamInfoResume[] = []
  proprietiesResum: ProprietyResume[] = [];
  dataDisplay:{[key:string]:any}[] = []
  filters : {[key:string]:any} = {}
  currentInfos : {Ids:{[key:string]:any}, Index:number}[] = []
  ItemContainerTypes = ItemContainerTypes;
  paramsSubscription : Subscription | undefined;
  dataSubscription : Subscription | undefined;
  subscribed = false;
  constructor(private URLParser: URLParserService, private caller: APICallerService, private route : ActivatedRoute) {}
  ngOnInit() {
  }
  setProprieties()
  {
    this.caller.Get<ParamInfoResume[]>({}, this._ControllerName, "Info/Proprieties")
      .subscribe(data => {
        this.Proprieties = data.sort(item => item.ind);
        this.proprietiesResum = this.Proprieties.filter(prop => prop.isMain).map(prop => ({
          name:prop.name,
          showTypeID: prop.showTypeID,
          params: prop.paramAffecteds.map(varsAffected => varsAffected.name)
        }));
        this.IdsNames = this.Proprieties.filter(prop => [7,8].includes(prop.showTypeID)).map(prop => prop.paramAffecteds[0].name);
        this.URLParser.GetSubscription("selected", this.route, false).subscribe(tempCurrent => this.setSelected(tempCurrent as number[][] ?? []));
        if (this.paramsSubscription)
          this.paramsSubscription.unsubscribe()
        this.paramsSubscription = this.URLParser.GetSubscription("filters", this.route, true).subscribe(filters => {
          console.log(filters);
          this.filters = filters;
          if (this.dataSubscription)
            this.dataSubscription.unsubscribe()
          this.dataSubscription = this.caller.Get<{[key:string]:any}[]>(filters, this._ControllerName, "GetAll")
          .subscribe(data => {
            this.dataDisplay = data;
            console.log(this.currentInfos)
            this.setIndex()
            console.log(this.currentInfos)
          });
        });
        /*
        this.paramsSubscription = this.URLParser.GetParams(this.route, this.IdsNames).subscribe(([filters, currentSelecteds]) => {
          console.log(currentSelecteds)
          if (currentSelecteds)
            this.currentInfos = currentSelecteds;
          console.log(filters);
          this.filters = filters;
          this.caller.Get<{[key:string]:any}[]>(filters, this._ControllerName, "GetAll")
            .subscribe(data => {
              this.dataDisplay = data;
              this.currentInfos.forEach(info =>
                info.Index = data.findIndex(item => Object.keys(info.Ids).every(key => item[key] == info.Ids[key]))
              )
            });
        });
        */
      });
  }
  setSelected(tempCurrent : number[][])
  {
    console.log(tempCurrent)
    this.currentInfos = tempCurrent.map(value =>
      ({Ids: toDictionarySimple<string, number>(this.IdsNames, key => key, (key, i) => value[i]), Index:-1})
    );
    console.log(this.dataDisplay)
    console.log(this.currentInfos)
    if (this.dataDisplay.length > 0)
      this.setIndex()
  }
  setIndex()
  {
    console.log(this.dataDisplay)
    this.currentInfos.forEach(info =>
      info.Index = this.dataDisplay.findIndex(item => Object.keys(info.Ids).every(key => item[key] == info.Ids[key]))
    );
  }
  getValue(params : string[], item : {[key:string]:any})
  {
    return params.map(param => item[param]).join(', ');
  }
  toggleSelected(i : number, item :{[key:string]:any})
  {
    const index = this.currentInfos.findIndex(info => info.Index == i);
    if (index > -1) {
      this.currentInfos.splice(index, 1);
    }
    else
    {
      const Ids = toDictionary(this.IdsNames, idName => idName, idName => item[idName]);
      this.currentInfos.push({Ids:Ids, Index:i});
    }
    console.log(this.currentInfos.map(info => info.Ids))
    this.URLParser.ChangeURL("selected", this.currentInfos.map(info => info.Ids), this.route);
  }
  checkIndex(i:number) : boolean
  {
    return this.currentInfos.some(info => info.Index == i);
  }
  currentInfosIds(i : number)
  {
    return this.currentInfos.find(info => info.Index == i)?.Ids;
  }
}
