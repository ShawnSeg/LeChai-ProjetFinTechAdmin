export interface ParamInfoResume{
  name:string,
  isMain:boolean,
  description:string,
  placeholder:string,
  showTypeID:number,
  ind:number,
  paramAffecteds:ParamAffectedResume[]
}
export function defaultParamInfo() : ParamInfoResume
{
  return {
    name: '',
    isMain: false,
    description: '',
    placeholder: '',
    showTypeID: 0,
    ind: 0,
    paramAffecteds: []
  };
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


export interface ProprietyResume{
  name:string,
  params:string[],
  showTypeID:number,
}

export interface FilterResume{
  name: string,
  type: number,
  params: (object | null)[]
}
