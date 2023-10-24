export interface ObjectEntry {
  key:string, value : any
}
export type Entryies = ObjectEntry | ObjectEntry[];


export function toDictionary<T, V>(array: T[], keySelector: (item: T) => string|null, valueSelector: (item: T) => V, checkForNullValue?:boolean): { [key: string]: V } {
  if (checkForNullValue)
    return array.reduce((result : { [key: string]: V }, item) => {
      const key = keySelector(item);
      const value = valueSelector(item);
      if (key != null && value != null)
        result[key] = value;
      return result;
    }, {});
  return array.reduce((result : { [key: string]: V }, item) => {
    const key = keySelector(item);
    if (key != null)
      result[key] = valueSelector(item);
    return result;
  }, {});
}
export function toDictionarySimple<T, V>(array: T[], keySelector: (item: T) => string|null, valueSelector: (item: T, index : number) => V): { [key: string]: V } {
  return array.reduce((result : { [key: string]: V }, item, i) => {
    const key = keySelector(item);
    if (key != null)
      result[key] = valueSelector(item, i);
    return result;
  }, {});
}
