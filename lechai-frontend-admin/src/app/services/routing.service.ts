import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Services } from './services.service';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';

export enum RouteTypes {
  GET = 1,
  POST = 2,
  PUT = 3,
  DELETE = 4,
}


@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  public baseURL = "https://localhost:5001";

  private routesPermises:String[] = []


  constructor(private http: HttpClient, private connexion:Services) {
   }

  getAPIRoute<T>(params:{[Key:string]: Object}, routeURL: string)
  {
    return this.http.get<T>(this.baseURL+routeURL + this.convertParamURL(params), this.getHeader());
  }


  getAPIRouteURL<T>(params:{[Key:string]: Object}, controlleurName: string, routeName:string)
  {
    return this.getAPIRoute<T>(params, `/${controlleurName}/${routeName}`);
  }

  callAPIRouteURL(routeType:RouteTypes, params:{[Key:string]: Object}, controlleurName: string, routeName:string)
  {
    return this.callAPIRoute(routeType, params, `/${controlleurName}/${routeName}`);
  }

  callAPIRoute(routeType:RouteTypes, params:{[Key:string]: Object}, routeURL: string)
  {

    const httpOptions = this.getHeader();

    switch (routeType)
    {
      case RouteTypes.POST:
        return this.http.post(this.baseURL+routeURL, params, httpOptions);
      case RouteTypes.PUT:
        return this.http.put(this.baseURL+routeURL, params, httpOptions);
      case RouteTypes.DELETE:
        return this.http.delete(this.baseURL+routeURL+this.convertParamURL(params), httpOptions);
      default:
        throw new Error();
    }
  }

  convertParamURL(params:{[Key:string]: Object})
  {
    if (Object.keys(params).length == 0)
      return "";
    let sb = "?";
    for (let Key in params)
    {
      sb+=`${Key}=${params[Key].toString()}`
    }
    return sb;
  }

  getHeader()
  {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.connexion.getToken()}`
      })
    };
  }


  envoiCourriel(sujet:String, message:String)
  {
    const url = this.baseURL+"/Clients/ConnexionStepTwo";

    // Create a request body with the product ID to send to the backend
    const body = { sujet:sujet, contenu:message};

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // Make an HTTP POST request to add the product to the panier
    return this.http.post(url, body, {headers:headers});

  }

  postChangementMDPAuthentifier(email:String, oldMDP:String, mdp:String)
  {
    const url =this.baseURL+"/Clients/ChangePassword";
    const body = {
      Email:email,
      NewPassword:mdp,
      Password:oldMDP
    }

    let testToken = localStorage.getItem("token")
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${testToken}`
    });

    return this.http.put(url, body, {headers:headers})
  }

  postChangementMDP(mdp:String, token:String)
  {
    const url =this.baseURL+"/Clients/RecuperationStepTwo";
    const body = {
      Token:token,
      NewPassword:mdp
    }

    let testToken = ""
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${testToken}`
    });

    return this.http.post(url, body, {headers:headers})
  }

  oublieMDP(email:string){
    const url = this.baseURL+"/Clients/RecuperationStepOne";

    // Create a request body with the product ID to send to the backend
    const body = { Email: email };

    const token = ""
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    // Make an HTTP POST request to add the product to the panier
    return this.http.post(url, body, {headers:headers});
  }
}
