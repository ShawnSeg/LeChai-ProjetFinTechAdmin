import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Services {

  private isConnected = new BehaviorSubject<boolean>(false);
  isConnected$ = this.isConnected.asObservable();

  /* private nameSubject = new BehaviorSubject<string>("Produits");
  name$ = this.nameSubject.asObservable();

  getControllerName(){
    return this.nameSubject.value;
  }

  setControllerName(name: string){
    this.nameSubject.next(name);
  } */

  constructor() {
    this.updateIsConnected(this.getToken());
  }

  setToken(token: string) {
    localStorage.setItem("token", token)

    this.updateIsConnected(token);
  }

  checkToken() {
    return this.isConnected.value;
  }

  clearToken(){
    localStorage.setItem("token", "")

    this.isConnected.next(false);
  }

  getToken()
  {
    return localStorage.getItem("token");
  }

  updateIsConnected(token: string|null)
  {
    this.isConnected.next(!(token==null || token==""));
  }

  expirationToken(){
    const eightHoursInMilliseconds = 5*1000;

    setTimeout(() => {
      // This code will run after 8 hours
      alert('8 hours have passed!');
    }, eightHoursInMilliseconds);
  }

  /* chargeInput(for: string, labelName: string, type: string, class: string, placeholder: string){

  } */
}
