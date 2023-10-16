import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ClientInterface, TableProprety } from 'src/Interface';
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
    return this.http.get<T>(this.baseURL+routeURL + this.convertParamURL(params),
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.connexion.getToken()}`
      })
    });
  }

  callAPIRouteURL(routeType:RouteTypes, params:{[Key:string]: Object}, controlleurName: string, routeName:string)
  {
    return this.callAPIRoute(routeType, params, `/${controlleurName}/${routeName}`);
  }

  callAPIRoute(routeType:RouteTypes, params:{[Key:string]: Object}, routeURL: string)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.connexion.getToken()}`
      })
    };

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



/*   getClientInfo(){
    const token = localStorage.getItem("token");
    alert(token)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ClientInterface>(this.baseURL+"/Clients/Get", {headers:headers});
  } */



 /*  updateClientInfo(prenom:string, ){

  }

  updateChangementQuantiteProduitPanier(productId:number, newQuantity:number){

    let appelApi = this.baseURL+"/Clients/ConnexionStepTwo"+productId.toString
    const requestBody = {
      productId:productId,
      quantity:newQuantity,
      clientId:1
    }

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(appelApi, requestBody, {headers:headers})
  }


  updateChangementFormatChoisiProduitPanier(productId:number, formatChoisi:String, typeFormat:String){
    let appelApi = this.baseURL+"/Clients/ConnexionStepTwo"+productId.toString
    const requestBody = {
      format_choisi:formatChoisi,
      type_format:typeFormat
    }

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(appelApi, requestBody, {headers:headers})
  }



  postProduitDansPanier(productId: number): Observable<any> {
    // Define the URL of your backend API endpoint for adding a product to the panier
    const url = this.baseURL+"/Clients/ConnexionStepTwo";

    // Create a request body with the product ID to send to the backend
    const body = { productId: productId };

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // Make an HTTP POST request to add the product to the panier
    return this.http.post(url, body,{headers:headers});
  }

  postListetDansPanier(liste:ProduitPanier[]){
    for(const produit of liste)
    {
      this.postProduitDansPanier(produit.id_produit)
    }

  }

 */


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
/*
  inscription(prenom:string, nom:string, date:Date, courrie:string, password:string){
    const url = this.baseURL+"/Clients/ConnexionStepTwo";
    const body = {
      prenomClient:prenom,
      nomClient:nom,
      dateNaissance:date,
      adresseCourriel:courrie,
      mdp:password
    }

    let token = ""

    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.post(url, body, httpOptions);
  }



  deleteProduitDePanier(productId:number){
    const url = this.baseURL+"/Clients/ConnexionStepTwo"+productId.toString(); // Replace with your actual backend API endpoint for deleting a product

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(url,{headers:headers});
  }

  deleteProduitListeSouhait(productId:number){
    const url = this.baseURL+"/Clients/ConnexionStepTwo"+productId.toString(); // Replace with your actual backend API endpoint for deleting a product

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(url,{headers:headers});
  }




  onCheckout(produits$:ProduitPanier[]){

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.post(this.baseURL+"/checkout", {
      produits: produits$
    }, {headers:headers}).subscribe(async(res:any)=>{
      let stripe = await loadStripe("pk_test_51NuEUwHpVTFwinL2GsdbSaNKqJs9htvKjE5onIUE1uzxJeL83khsXqRaFBCEHxBUL1aiExj6bqPGFgNChGGXupWz00ZQ2fGI1Y")
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })
  }

  UpdateChangementInfoClient(prenom:string, nom:string,dateNaissance:Date,email:string, id:number){
    const url =this.baseURL+"/Clients/UPDATE";
    const body = {
      Prenom:prenom,
      Nom:nom,
      DateNaissance:dateNaissance,
      Email:email,
      ID:id
    }

    let testToken = localStorage.getItem("token")
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${testToken}`
    });

    return this.http.put(url, body, {headers:headers})
  } */

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

/*   addProduitListeSouhait(produitId:number)
  {
    const url = this.baseURL+"/checkout";

    // Create a request body with the product ID to send to the backend
    const body = { product: produitId };

    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    // Make an HTTP POST request to add the product to the panier
    return this.http.post(url, body, {headers:headers});
  }

  checkPromotionPaiement(promo:String){
    const url = this.baseURL+"/checkout";

    const body = {
      Promotion: promo,
    }

    let token = localStorage.getItem("token")

    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.post(url, body, httpOptions);
  }

  testRecevoirAPI(){
    const url = this.baseURL+"/ReseauxSociaux/GetAll";



    let token = ""

    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.get<reseau>(url, httpOptions);
  } */
}
