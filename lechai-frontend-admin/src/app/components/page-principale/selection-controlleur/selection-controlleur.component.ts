import { Component } from '@angular/core';
import { Controlleur } from 'src/Interface';
import { Services } from 'src/app/services/services.service';

@Component({
  selector: 'app-selection-controlleur',
  templateUrl: './selection-controlleur.component.html',
  styleUrls: ['./selection-controlleur.component.scss']
})
export class SelectionControlleurComponent {

  controlleurs: Controlleur[] = [
    {
      id:1,
      nom:'Produits'
    },
    {
      id:2,
      nom:'Commandes'
    },
    {
      id:3,
      nom:'Collaborateurs'
    },
    {
      id:4,
      nom:'Catégories'
    },
  ];

  control: string = "Produits";


  constructor(serv: Services) {}

  changerControl(nouveauControl: string) {
    this.control = nouveauControl;
  }

/*   chargeInput(for: string, labelName: string, type: string, class: string, placeholder: string)
  {
    this.serv.chargeInput(for, labelName, type, class, placeholder)
  } */
}
