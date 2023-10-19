import { identifierName } from '@angular/compiler';
import { Component, Output, EventEmitter } from '@angular/core';
import { TableProprety } from 'src/Interface';
import { FooterPositionService } from 'src/app/services/footer-position.service';
import { RoutingService } from 'src/app/services/routing.service';
import { Route } from '@angular/router';
import { Services } from 'src/app/services/services.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-principale',
  templateUrl: './page-principale.component.html',
  styleUrls: ['./page-principale.component.scss']
})
export class PagePrincipaleComponent {
  /* nomPageControlleur: string = "Produits"; */
  /* @Output() nomPageControlleurChange = new EventEmitter<string>(); */

  controllerName$: Observable<string>;

  constructor(private footerPosition:FooterPositionService, private routing:RoutingService, private services:Services) {
    this.controllerName$ = this.services.name$;
  }

  ngOnInit() {
    this.footerPosition.setIsAbsolute(false);
    this.getHeaderTable();

  }

  async getHeaderTable()
  {

    /* this.routing.getAPIRoute<TableProprety[]>({}, `${this.nomPageControlleur}/Info/Propriety`)
    .subscribe(data => this.tableProprety = data); */

    /* alert(localStorage.getItem("token")); */


  }

  /* changeControl(event: string)
  {
    this.nomPageControlleur = event;
    this.nomPageControlleurChange.emit(this.nomPageControlleur);
    this.getHeaderTable();
  } */

}
