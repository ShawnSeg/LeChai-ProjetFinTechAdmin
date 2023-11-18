import { identifierName } from '@angular/compiler';
import { Component, Output, EventEmitter } from '@angular/core';
import { FooterPositionService } from 'src/app/services/footer-position.service';
import { RoutingService } from 'src/app/services/routing.service';
import { Route } from '@angular/router';
import { Services } from 'src/app/services/services.service';
import { Observable } from 'rxjs';
import { Controller } from './controllers/controllers.component';
import { APICallerService } from 'src/app/apicaller.service';

@Component({
  selector: 'app-page-principale',
  templateUrl: './page-principale.component.html',
  styleUrls: ['./page-principale.component.scss']
})
export class PagePrincipaleComponent {

  controllers : Controller[] = [];
  ifControllers : boolean = false;

  constructor(private footerPosition:FooterPositionService, private caller:APICallerService) {

  }

  ngOnInit() {
    this.footerPosition.setIsAbsolute(false);


  }



  /* changeControl(event: string)
  {
    this.nomPageControlleur = event;
    this.nomPageControlleurChange.emit(this.nomPageControlleur);
    this.getHeaderTable();
  } */

}
