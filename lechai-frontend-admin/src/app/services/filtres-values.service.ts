import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltresValuesService {

  private isHideSubject = new BehaviorSubject<boolean>(false);
  isHide$ = this.isHideSubject.asObservable();

  constructor() { }

  setIsHide(value:boolean)
  {
    this.isHideSubject.next(value);
  }
}
