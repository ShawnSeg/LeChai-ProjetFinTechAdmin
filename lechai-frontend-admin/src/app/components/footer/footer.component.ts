import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FooterPositionService } from 'src/app/services/footer-position.service';
import { Subscription } from 'rxjs';
import { ObjectEntry } from 'src/app/generalInterfaces';
import { ParamInfoResume, defaultParamInfo } from 'src/app/DisplayItemsInterfaces';
import { APICallerService } from 'src/app/apicaller.service';
import { Services } from 'src/app/services/services.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @ViewChild('footer') footer?: ElementRef;
  private subscription?: Subscription;
  objectCouleur? : ObjectEntry;
  ParamInfoCouleur: ParamInfoResume = defaultParamInfo();
  idCouleurFoot = 5;
  couleurFoot: string = "";

  constructor(private footerPosition: FooterPositionService, private caller:APICallerService, private services: Services) {
    // Subscribe to changes in the isAbsolute property

  }

  ngOnInit() {

    this.ParamInfoCouleur.showTypeID = 13;
    this.caller.Get({ID:this.idCouleurFoot}, "Couleurs", "GET").subscribe((couleur:any) => {
      this.couleurFoot = `--${couleur["NomVariable"]}`
      this.objectCouleur = {key : this.couleurFoot, value: couleur["Value"]}
    })

  }

  ngAfterViewInit()
  {
    this.subscription = this.footerPosition.isAbsolute$.subscribe(isAbsolute => {
      if (isAbsolute) {
        (this.footer?.nativeElement as HTMLElement).classList.add('absolute');
        (this.footer?.nativeElement as HTMLElement).classList.remove('sticky');
      } else {
        (this.footer?.nativeElement as HTMLElement).classList.add('sticky');
        (this.footer?.nativeElement as HTMLElement).classList.remove('absolute');
      }
    });
  }

  ngOnDestroy() {
    // Don't forget to unsubscribe to prevent memory leaks
    this.subscription?.unsubscribe();
  }

  updateCouleurFoot(value:string)
  {
    this.services.updateCssVariable(this.couleurFoot, value);
    this.caller.Put({ID: this.idCouleurFoot, Value: value}, "Couleurs", "UPDATE").subscribe(()=>{});
  }

}
