import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, filter, map } from 'rxjs';
import { toDictionary, toDictionarySimple } from './generalInterfaces';
import { __values } from 'tslib';
interface base {
  variableName : string,
  requested : boolean,
  value : any,
  setter : (router : Router, value : any, route : ActivatedRoute) => void;
  getter : (route : ActivatedRoute) => any;
}
@Injectable({
  providedIn: 'root'
})
export class URLParserService {
  parserTool : {[key : string] : base} = {
    controller : {
      //string
      variableName : "controllerName",
      requested : false,
      value : null,
      setter : function (router, value : any, route) {
        router.navigate(['../', this.value = value], {relativeTo: route});
      },
      getter : function (route) {
        if (!this.value)
          return this.value = route.snapshot.paramMap.get(this.variableName)
        return this.value;
      }
    },
    selected : {
      //any[][]
      variableName : "currentSelected",
      requested : false,
      value : null,
      setter : function (router, value : any, route) {
        this.value = (value as {[key:string]:any}[]).map(entry => Object.keys(entry).map(key => entry[key]));
        //console.log(this.value)
        router.navigate([], {relativeTo: route,
          queryParamsHandling: 'merge',
          queryParams: { currentSelected: this.value.length > 0 ? (this.value as any[][]).map(entry => entry.join(":")).join(",")  : null}
        });
      },
      getter : function (route) {
        //console.log(this.value)
        if (this.value != null)
          return this.value;
        let ids = route.snapshot.queryParamMap.get(this.variableName);
        //console.log(ids)
        if (ids == null)
          return []
        return this.value = ids.split(",").map(single => {
          return single.split(":").map(id => parseInt(id));
        });
      }
    },
    filters : {
      //any[][]
      variableName : "",
      requested : false,
      value : null,
      setter : function (router, value : any, route) {
        this.value = value
        const paraMap = route.snapshot.paramMap;
        //currentParams = toDictionarySimple(knownParams, key => key, key =>  paraMap.get(key));
        router.navigate([this.value], {relativeTo: route});
      },
      getter : function (route) {
        if (this.value != null)
          return this.value;
        const paramMap = route.snapshot.paramMap
        return this.value = toDictionary<string, any>(paramMap.keys, (key) => key != "controllerName" ? key : null, (key) => paramMap.get(key), true);
      }
    }
  };
  controllerNameVariableName = 'controllerName';
  currentSelectedVariableName = "currentSelected";
  knownParams : string[] = ["currentSelected", "controllerName"];
  selectedController:string = "";
  oldFilters : {[key:string]:any}|null = null;
  currentSelectedLength : number = -2 //we check the lenght because the comparaison is strong ehouph for our needs
  currentSelectedIds : {Ids:{[key:string]:any}, Index:number}[] | null = []
  requestMade : boolean = false
  connectionURL : string = "/connexion";

  private filtersSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(private router : Router) {
  }

  getFilters()
  {
    return this.filtersSubject.asObservable();
  }
  updateFilters(newFilters: any) {
    this.filtersSubject.next(newFilters); // Émettez la nouvelle valeur
  }


  GetControlleur(route: ActivatedRoute) : string
  {
    return route.snapshot.paramMap.get(this.controllerNameVariableName)??""
  }

  GetControlleurSub(route: ActivatedRoute) : Observable <string>
  {
    return route.paramMap.pipe(
      map(paramMap => paramMap.get(this.controllerNameVariableName)??"")
/*       filter(value => value != this.selectedController),
      map(value => this.selectedController = value) */
    );
  }

  GetSubscription(type : string, route : ActivatedRoute, always : boolean) : Observable<any>
  {
    return route.paramMap.pipe(
      map(paramMap => this.GetURLInstance(type, route, always)),
      filter(value => value != null),
      map(value => value)
    );
  }
  GetOneTime(type : string, route : ActivatedRoute, always : boolean) : any
  {
    return this.GetURLInstance(type, route, always);
  }
  ChangeURL(type : string, value : any, route : ActivatedRoute, makeRequest = true)
  {
    this.requestMade = makeRequest;

    if(makeRequest)
      this.parserTool[type].requested = true;

    this.parserTool[type].setter(this.router, value, route);
  }
  GetURLInstance(type : string, route : ActivatedRoute, always : boolean) : any
  {
    if (!this.requestMade)
      this.parserTool[type].value = null;
    else if (!always || !this.parserTool[type].requested)
      return null;
    this.requestMade = false;
    this.parserTool[type].requested = false;
    return this.parserTool[type].getter(route);
  }
  ParseAll(paraMap : ParamMap): { [key: string]: any }
  {
    return toDictionary<string, any>(paraMap.keys, key => key == this.controllerNameVariableName ? null : key, (key) => paraMap.get(key));
  }

  noConnection()
  {
    this.router.navigate([this.connectionURL]);
  }
}
