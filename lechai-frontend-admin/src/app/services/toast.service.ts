import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  timer:any;

  status: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() { }

  showToast(type: string, msg: string, position?: string, timeClose?: number) {
    localStorage.setItem("toastType", type);
    localStorage.setItem("toastPosition", position || 'top-right');
    this.status.next(msg);

    if (this.timer) {
      clearTimeout(this.timer);
    }

    if (timeClose) {
      this.timer = window.setTimeout(() => {
        this.status.next(null);
      }, timeClose)
    }
  }
}
