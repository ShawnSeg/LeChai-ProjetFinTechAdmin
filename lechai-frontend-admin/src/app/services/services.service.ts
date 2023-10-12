import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Services {

  private isConnected = new BehaviorSubject<boolean>(false);
  isConnected$ = this.isConnected.asObservable();

  constructor() { }

  setConnected(isConnected: boolean) {
    this.isConnected.next(isConnected);
  }

  /* getIsAbsolute() {
    return this.isConnected.value;
  }

  setIsAbsolute(value: boolean) {
    this.isConnected.next(value);
  } */

  /* chargeInput(for: string, labelName: string, type: string, class: string, placeholder: string){

  } */
}
