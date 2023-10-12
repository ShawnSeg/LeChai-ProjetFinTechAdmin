


export interface ApiResponse {
  message: string;
}

export interface ClientInterface{
  ID:number,
  Nom:string,
  Prenom:string,
  Email:string,
  DateNaissance:string,
  MDP:string,
  Token:string,
  Sel:string,
  Actif:Boolean
}

export interface Controlleur{
  id:number,
  nom:string
}
