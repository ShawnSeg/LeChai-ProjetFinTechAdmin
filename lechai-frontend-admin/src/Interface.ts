


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
  name:string,
  isMain:boolean
}

export interface TableProprety{
  Name:string,
  IsMane:boolean,
  Validators:Validator[],
  ShowType:number,
  ShowTypeName:string,
  /* MapperGenerator: MapperGenerator, */
}

export interface Validator{
  ValidatorType:number,
  /* Name:string, */
  Value:object,
  Message:string
}
