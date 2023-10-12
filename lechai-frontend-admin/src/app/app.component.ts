import { Component } from '@angular/core';
import { ToastService } from './services/toast.service';

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

  constructor(private toast: ToastService) {

  }

  ngOnInit(): void {
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
