import { Component, ViewChild, ElementRef, OnInit  } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { Subscription } from 'rxjs';
import { APICallerService } from 'src/app/apicaller.service';
import { ParamInfoResume, defaultParamInfo } from 'src/app/DisplayItemsInterfaces';
import { ObjectEntry } from 'src/app/generalInterfaces';
import { Services } from 'src/app/services/services.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  nomAdmin: string|null = '';
  connecter:boolean = false;
  ParamInfoCouleur: ParamInfoResume = defaultParamInfo();
  couleurNav: string = "";
  objectCouleur? : ObjectEntry;
  token$!: Observable<string | null>;
  idCouleurNav = 1;

  /* private subscription: Subscription; */

  constructor(private router: Router, private toast: ToastService, private caller:APICallerService, private services: Services){
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

    this.ParamInfoCouleur.showTypeID = 13;
    this.caller.Get({ID:this.idCouleurNav}, "Couleurs", "GET").subscribe((couleur:any) => {
      this.couleurNav = `--${couleur["NomVariable"]}`
      this.objectCouleur = {key : this.couleurNav, value: couleur["Value"]}
    })

      /* this.connexion.isConnected$.subscribe(isConnected => {
      this.connecter = isConnected;
    }); */

    /* this.connecter = this.connexion.checkToken(); */
  }

/*   onColorChange(event: any) {
    this.navBackgroundColor = event.target.value;
  } */

  deconnecter()
  {
    this.caller.clearLocalStorage();
    this.router.navigate(["/connexion"]);
    this.toast.showToast("success", "Déconnexion réussi.", "bottom-center", 4000);

  }

  updateCouleurNav(value:string)
  {
    console.log(value)
    this.services.updateCssVariable(this.couleurNav, value);
    this.caller.Put({ID: this.idCouleurNav, Value: value}, "Couleurs", "UPDATE").subscribe(()=>{});
  }

}
