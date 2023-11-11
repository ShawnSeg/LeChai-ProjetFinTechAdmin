import { Component, ViewChild, ElementRef, OnInit  } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { Subscription } from 'rxjs';
import { APICallerService } from 'src/app/apicaller.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  nomAdmin: string|null = 'Alberto';
  connecter:boolean = false;
  navBackgroundColor: string = '#FFCFDF';

  token$!: Observable<string | null>;

  /* private subscription: Subscription; */

  constructor(private router: Router, private toast: ToastService, private caller:APICallerService){
    /* this.subscription = this.connexion.isConnected$.subscribe(isConnected => {
      if (isConnected) {
        this.connecter = true
      } else {
        this.connecter = false;
      }
    }); */
  }

  ngOnInit() {

    this.nomAdmin = this.caller.getUserName();


      /* this.connexion.isConnected$.subscribe(isConnected => {
      this.connecter = isConnected;
    }); */

    /* this.connecter = this.connexion.checkToken(); */
  }

  onColorChange(event: any) {
    this.navBackgroundColor = event.target.value;
  }

  deconnecter()
  {
    this.caller.clearLocalStorage();
    this.router.navigate(["/connexion"]);
    this.toast.showToast("success", "Déconnexion réussi.", "bottom-center", 4000);

  }

}
