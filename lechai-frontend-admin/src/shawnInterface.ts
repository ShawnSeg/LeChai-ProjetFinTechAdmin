export interface ParamInfoResume{
  name:string,
  isMain:boolean,
  description:string,
  placeholder:string,
  showTypeID:number,
  ind:number,
  paramAffecteds:ParamAffectedResume[]
}

export interface ParamAffectedResume{
  name:string,
  isRequired:boolean,
  validators:ValidatorResume[]
}

export interface ValidatorResume{
  valueToUse:any,
  validatorTypeID:number,
  message:string
}
