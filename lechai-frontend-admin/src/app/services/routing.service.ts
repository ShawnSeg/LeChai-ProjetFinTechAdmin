import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ClientInterface } from 'src/Interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  public baseURL = "https://localhost:7247";

  private routesPermises:String[] = []


  constructor(private http: HttpClient) { }

  //Voir avec amélie comment elle stock le id client
/*
  testAPI() {
    return this.http.get<ApiResponse>("https://localhost:7247/testProduit");
  }
  getRoutesPermisesClients(): void{
    //Store les routes que les clients pourront utiliser
  }

  getProduitDetail(produitId:number):Observable<ProduitTestAPI>{

    let token = ""
    alert(produitId)
    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.get<ProduitTestAPI>(this.baseURL+"/Produits/GetDetailed?ID="+produitId.toString, httpOptions)
  }

  getCategories(){
    let token = ""

    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get<Produit[]>(this.baseURL+"/Categories/GetAll", httpOptions)
  }

  getCarousel(): Observable<Carousel[]> {
    let token = "";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get<Carousel[]>(this.baseURL + "/carousel/", httpOptions);
  }

  getProduitsPanier(): Observable<ProduitPanier[]>{
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ProduitPanier[]>(this.baseURL+"/testProduit/", {headers:headers});
  }

  getProduitsListeSouhait(): Observable<ProduitPanier[]>{
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ProduitPanier[]>(this.baseURL+"/testProduit/", {headers:headers});
  }

  getAllProduit():Observable<Produit[]>{
    let token = ""

    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get<Produit[]>(this.baseURL+"/Produits/GetAll", httpOptions)
  }

  getListeCommandes(): Observable<Commandes[]>{
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Commandes[]>(this.baseURL+"/testProduit/", {headers:headers});
  }

  getCollaborateur():Observable<Collaborateurs[]>{
    let token = ""

    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get<Collaborateurs[]>(this.baseURL+"/Collaborateurs/GetAll", httpOptions);
  }

  getCommandesDetail(commandeId:number): Observable<Commandes>{
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const appelApi = this.baseURL+"/testProduit/"+commandeId.toString
    return this.http.get<Commandes>(appelApi, {headers:headers});
  }

  getAdresseLivraisonPassee(): Observable<AdresseLivraison[]>{
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<AdresseLivraison[]>(this.baseURL+"/testProduit/", {headers:headers});
  }
 */
  getClientInfo(){
    const token = localStorage.getItem("token");
    alert(token)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ClientInterface>(this.baseURL+"/Clients/Get", {headers:headers});
  }

  connexion(courriel:string, mdp:string)
  {
    const url = this.baseURL+"/Clients/ConnexionStepOne";

    const body = {
      Email: courriel,
      Password:mdp
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

  checkToken(token:String){
    const url = this.baseURL+"/Clients/ConnexionStepTwo";
    alert(token)
    const body = {
      Token: token,

    }

    let tokentest = ""

    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokentest}`
      })
    };
    return this.http.post(url, body, httpOptions);
  }

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
