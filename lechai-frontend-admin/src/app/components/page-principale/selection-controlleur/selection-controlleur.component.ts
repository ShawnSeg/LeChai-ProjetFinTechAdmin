import { Component, Output, EventEmitter } from '@angular/core';
import { Controlleur } from 'src/Interface';
import { Services } from 'src/app/services/services.service';
import { RouteTypes, RoutingService } from 'src/app/services/routing.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastService } from 'src/app/services/toast.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-selection-controlleur',
  templateUrl: './selection-controlleur.component.html',
  styleUrls: ['./selection-controlleur.component.scss']
})
export class SelectionControlleurComponent {

  controlleurs: Controlleur[] = [
    {
      id:1,
      name:'Produits',
      isMain:true
    },
    {
      id:2,
      name:'Commandes',
      isMain:false
    },
    {
      id:3,
      name:'assssss',
      isMain:true
    },
    {
      id:4,
      name:'ddddddddd',
      isMain:false
    },
  ];

  control: string="Produit";
  @Output() changeControl= new EventEmitter<string>();
  selectedControlleur: number=1;


  constructor(serv: Services,  private routingSevice:RoutingService, private toast: ToastService, private route: ActivatedRoute) {}

  ngOnInit()
  {

    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      console.log('ID from URL:', id);

      if (id !== null) {
        this.selectedControlleur = +id;
        this.changerControl(this.selectedControlleur);
      }
    });

    this.routingSevice.getAPIRoute<Controlleur>({}, "Info/Controllers")
      .subscribe({
        next: (data: any) => {
          // Handle successful response here
          this.controlleurs = data;
        },
        error: (error: HttpErrorResponse) => {
          // Handle error response here
          this.toast.showToast("error", 'Le chargement de la page n\'a pas bien été fait.', "bottom-center", 4000);
          console.error('Status code:', error.status);

        }
      });
  }

  changerControl(id: number) {
    let nameController = this.controlleurs.find(controller => controller.id === Number(id));
    console.log(nameController)
    if (nameController) {
      this.control = nameController.name;
      this.changeControl.emit(this.control);
    } else {
      console.error(`Contrôleur avec l'ID ${id} introuvable.`);
    }
  }

  onChangeControl() {
    let selectedId = this.selectedControlleur;
    this.changerControl(selectedId);
  }

/*   chargeInput(for: string, labelName: string, type: string, class: string, placeholder: string)
  {
    this.serv.chargeInput(for, labelName, type, class, placeholder)
  } */
}
