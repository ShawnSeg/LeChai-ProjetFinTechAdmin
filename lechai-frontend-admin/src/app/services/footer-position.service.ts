import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FooterPositionService {
  private isAbsoluteSubject = new BehaviorSubject<boolean>(false);
  isAbsolute$ = this.isAbsoluteSubject.asObservable();

  constructor() { }

  getIsAbsolute() {
    return this.isAbsoluteSubject.value;
  }

  setIsAbsolute(value: boolean) {
    this.isAbsoluteSubject.next(value);
  }
}
