import { RouteTypes } from "./apicaller.service";
import { ValidatorResume, ValidatorTypes } from "./validators";

export interface ParamInfoResume{
  name:string,
  isMain:boolean,
  description:string,
  placeholder:string,
  showTypeID:number,
  mapper:MapperResume|null,
  ind:number,
  paramAffecteds:ParamAffectedResume[],
  showValue?: Object
}
export function defaultParamInfo() : ParamInfoResume
{
  return {
    name: '',
    isMain: false,
    description: '',
    placeholder: '',
    showTypeID: 0,
    mapper: null,
    ind: 0,
    paramAffecteds: []
  };
}

export interface ParamAffectedResume{
  name:string,
  isRequired:boolean,
  validators:ValidatorResume[],
  hasValue?:boolean
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

export interface MapperResume {
  refController: string,
  parametersToLink: {[key:string]:string},
  baseParameters: {[key:string]:any}
}

export interface RouteResume {
  name: string,
  routeDisplayType: RouteDisplayTypes,
  routeType:RouteTypes
}
export enum RouteDisplayTypes {
  NONE = 1,
  GET = 2,
  MULTIPLE = 3,
  SINGLE = 4
}
export interface RouteResumeBundle {
  route: RouteResume,
  paramsInfo : ParamInfoResume[]
}
