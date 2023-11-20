
export enum ValidatorTypes
{
    REQUIRED = 1,
    MAX = 2,
    MIN = 3,
    REGEX = 4,
    MAXOREQUAL = 5,
    MINOREQUAL = 6,
    BOOLEAN = 7
}

export interface ValidatorResume{
  valueToUse:any,
  validatorTypeID:ValidatorTypes,
  message:string
  hasError?: boolean
}

export function validate(validatorResum: ValidatorResume, value: any) : boolean
{
  try{
    switch (validatorResum.validatorTypeID) {
      case ValidatorTypes.REQUIRED:
          return (value != null)

      case ValidatorTypes.MAX:
          return (value < validatorResum.valueToUse)

      case ValidatorTypes.MIN:
          return (value > validatorResum.valueToUse)

      case ValidatorTypes.REGEX:

        return new RegExp(validatorResum.valueToUse).test(value)

      case ValidatorTypes.MAXOREQUAL:
          return (value <= validatorResum.valueToUse)

      case ValidatorTypes.MINOREQUAL:
          return (value >= validatorResum.valueToUse)

      case ValidatorTypes.BOOLEAN:
        return (value === true || value === false || value == 1 || value == 0)

      default:
        return false
    }
  }
  catch{
    return false;
  }

}
