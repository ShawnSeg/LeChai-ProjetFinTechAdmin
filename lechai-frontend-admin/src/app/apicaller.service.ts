import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
export enum RouteTypes {
  GET = 1,
  POST = 2,
  PUT = 3,
  DELETE = 4,
}

export interface UserInfoBundle{
  token:string,
  name:string
}

@Injectable({
  providedIn: 'root'
})
export class APICallerService{

  public baseURL = "https://localhost:5001";
  //public baseURL = "https://localhost:7247";
  public token = "";
  public controllerConnexionName = "Employes";
  public connexionRouteNameStepOne = "ConnexionStepOne";
  public connexionRouteNameStepTwo = "ConnexionStepTwo";
  public refreshTokenRouteName = "RefreshToken";
  constructor(private http: HttpClient) {
    let tempToken = localStorage.getItem("token");
    if(tempToken)
      this.token=tempToken;
  }

  setToken(token: string) {
    localStorage.setItem("token", token)
    this.token = token;
  }
  setUserName(name: string) {
    localStorage.setItem("name", name)
  }
  getUserName(){
    return localStorage.getItem("name")
  }
  clearLocalStorage(){
    localStorage.setItem("token", "");
    localStorage.setItem("name", "");
  }

  isConnected()
  {
    return !!this.token
  }

  ConnexionStepOne(userName:string, password:string): Observable<boolean>{
    return this.Post({"Email": userName, "Password": password}, this.controllerConnexionName, this.connexionRouteNameStepOne)
    .pipe(
      map(data => {
        return true;
      }),
      catchError(error => {
        return of(false);
      })
    );
  }
  ConnexionStepTwo(connexionValidationToken:string): Observable<string|null|UserInfoBundle> {
    return this.Post<string|UserInfoBundle>({"Token": connexionValidationToken}, this.controllerConnexionName, this.connexionRouteNameStepTwo)
    .pipe(
      map(data => {
        if (!data)
          return null;
        this.token = (typeof data === "string")? data: data.token;

        return data;
      }),
      catchError(error => {
        return of(null);
      })
    );
  }
  RefreshToken() : Observable<boolean>
  {
    return this.Get<string>({}, this.refreshTokenRouteName)
    .pipe(
      map(data => {
        if (!data)
          return false;
        this.token = data;
        return true;
      }),
      catchError(error => {
        return of(false);
      })
    );
  }



  Get<T>(params: { [key: string]: Object }, controllerName: string, routeName: string): Observable<T>;
  Get<T>(params: { [key: string]: Object }, routeURL: string): Observable<T>;
  Get<T>(params: { [key: string]: Object }, controllerOrRoute: string, routeName?: string): Observable<T>
  { console.log(this.GetRoutePath(controllerOrRoute, routeName)); return this.http.get<T>(this.GetRoutePath(controllerOrRoute, routeName)+this.ParamsToURL(params), this.GetHeader());}

  Post<T>(params: { [key: string]: Object }, controllerName: string, routeName: string): Observable<T>;
  Post<T>(params: { [key: string]: Object }, routeURL: string): Observable<T>;
  Post<T>(params: { [key: string]: Object }, controllerOrRoute: string, routeName?: string): Observable<T>
  { return this.http.post<T>(this.GetRoutePath(controllerOrRoute, routeName), params, this.GetHeader());}

  Put<T>(params: { [key: string]: Object }, controllerName: string, routeName: string): Observable<T>;
  Put<T>(params: { [key: string]: Object }, routeURL: string): Observable<T>;
  Put<T>(params: { [key: string]: Object }, controllerOrRoute: string, routeName?: string): Observable<T>
  { console.log(this.GetRoutePath(controllerOrRoute, routeName)); return this.http.put<T>(this.GetRoutePath(controllerOrRoute, routeName), params, this.GetHeader());}

  Delete<T>(params: { [key: string]: Object }, controllerName: string, routeName: string): Observable<T>;
  Delete<T>(params: { [key: string]: Object }, routeURL: string): Observable<T>;
  Delete<T>(params: { [key: string]: Object }, controllerOrRoute: string, routeName?: string): Observable<T>
  { return this.http.delete<T>(this.GetRoutePath(controllerOrRoute, routeName)+this.ParamsToURL(params), this.GetHeader());}

  CallAPI<T>(routeType: RouteTypes, params: { [key: string]: Object }, controllerName: string, routeName: string): Observable<T>;
  CallAPI<T>(routeType: RouteTypes, params: { [key: string]: Object }, routeURL: string): Observable<T>;
  CallAPI<T>(routeType: RouteTypes, params: { [key: string]: Object }, controllerOrRoute: string, routeName?: string): Observable<T>
  { return this.CallAPIDirect<T>(routeType, params, this.GetRoutePath(controllerOrRoute, routeName)); }

  CallAPIDirect<T>(routeType: RouteTypes, params: { [key: string]: Object }, routePath: string): Observable<T>
  {
    const httpOptions = this.GetHeader();

    switch (routeType)
    {
      case RouteTypes.GET:
        return this.http.get<T>(routePath+this.ParamsToURL(params), httpOptions);
      case RouteTypes.POST:
        return this.http.post<T>(routePath, params, httpOptions);
      case RouteTypes.PUT:
        return this.http.put<T>(routePath, params, httpOptions);
      case RouteTypes.DELETE:
        return this.http.delete<T>(routePath+this.ParamsToURL(params), httpOptions);
      default:
        throw new Error();
    }
  }
  GetRoutePath(controllerOrRoute: string, routeName?: string)
  {
    return routeName ? `${this.baseURL}/${controllerOrRoute}/${routeName}` : `${this.baseURL}${controllerOrRoute}`;
  }
  ParamsToURL(params:{[Key:string]: Object})
  {
    if (Object.keys(params).length == 0)
      return "";

      console.log(params)
    return "?"+Object.keys(params).map(key => `${key}=${params[key].toString()}`).join("&");
  }
  GetHeader()
  {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    };
  }
}
