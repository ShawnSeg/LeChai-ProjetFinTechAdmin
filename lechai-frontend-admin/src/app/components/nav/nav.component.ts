import { Component, ViewChild, ElementRef, OnInit  } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { Services } from 'src/app/services/services.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  nomAdmin: string = 'Alberto';
  connecter:boolean = false;
  token$!: Observable<string | null>;

  /* private subscription: Subscription; */

  constructor(private auth: AuthService, private router: Router, private toast: ToastService, private connexion:Services){
    /* this.subscription = this.connexion.isConnected$.subscribe(isConnected => {
      if (isConnected) {
        this.connecter = true
      } else {
        this.connecter = false;
      }
    }); */
  }

  ngOnInit() {
    this.connexion.isConnected$.subscribe(isConnected => {
      this.connecter = isConnected;
    });

/*     if(localStorage.getItem("token"))
    {
      this.connecter = true
    }
    else{
      this.connecter = false
    } */

  }

  deconnecter()
  {
    localStorage.removeItem("token")
    this.connexion.setConnected(false);
    this.router.navigate([""]);
    this.toast.showToast("success", "Déconnexion réussi.", "bottom-center", 4000);
  }

}
