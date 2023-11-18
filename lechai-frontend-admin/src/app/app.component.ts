import { Component } from '@angular/core';
import { ToastService } from './services/toast.service';
import { APICallerService } from './apicaller.service';
import { Services } from './services/services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lechai-frontend-admin';
  showToast = false;
  toastMsg = "";
  toastType = "";
  toastPosition = "";

  constructor(private toast: ToastService, private caller : APICallerService, private services: Services) {

  }

  ngOnInit(): void {
    this.caller.Get<{[key:string]:string}>({}, "Couleurs", "GetValues").subscribe(values =>{
      Object.keys(values).forEach(key => this.services.updateCssVariable(`--${key}`, values[key]))
    })

    this.toast.status.subscribe((msg: string) =>{
      this.toastType = localStorage.getItem("toastType") || "";
      this.toastPosition = localStorage.getItem("toastPosition") || "";
      if (msg === null){
        this.showToast = false;
      }
      else {
        this.showToast = true;
        this.toastMsg = msg;
      }
    })
  }

  closeToast() {
    this.showToast = false;
  }

  onActive(){
    window.scroll(0, 0);
  }
}
