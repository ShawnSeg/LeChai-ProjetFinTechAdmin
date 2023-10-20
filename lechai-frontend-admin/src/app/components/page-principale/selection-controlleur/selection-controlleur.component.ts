import { Component, Output, EventEmitter } from '@angular/core';
import { Controlleur } from 'src/Interface';
import { Services } from 'src/app/services/services.service';
import { RouteTypes, RoutingService } from 'src/app/services/routing.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastService } from 'src/app/services/toast.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-selection-controlleur',
  templateUrl: './selection-controlleur.component.html',
  styleUrls: ['./selection-controlleur.component.scss']
})
export class SelectionControlleurComponent {

  controlleurs: Controlleur[] = [
    /* {
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
    }, */
  ];

  /* @Output() changeControl= new EventEmitter<string>(); */
  selectedControlleur: string="";


  constructor(private http:HttpClient,  private routingSevice:RoutingService, private toast: ToastService, private route: ActivatedRoute, private router:Router,
              private services:Services) {

              }
  listeControlleur:string[] = []








  ngOnInit()
  {


    this.selectedControlleur!=this.route.snapshot.paramMap.get("name")
    console.log(this.selectedControlleur)
    /*this.route.paramMap.subscribe(params => {
      let name = params.get('name');
      console.log('ID from URL:', name);

      if (name !== null) {
        this.selectedControlleur = name;
        this.changeControl.emit(this.selectedControlleur);
        this.services.setControllerName(name);
         console.log(this.controllerName$)

      }
    });*/

      //this.getControlleurs()

    this.routingSevice.getAPIRouteURL<Controlleur>({}, "Info", "Controllers")
      .subscribe({
        next: (data: any) => {
          // Handle successful response here
          this.controlleurs = data;
          for(let i = 0; i<this.controlleurs.length;i++)
          {
            this.listeControlleur.push(this.controlleurs[i].name)
          }
          console.log(this.listeControlleur)
        },
        error: (error: HttpErrorResponse) => {
          // Handle error response here
          this.toast.showToast("error", 'Le chargement de la page n\'a pas bien été fait.', "bottom-center", 4000);
          console.error('Status code:', error.status);

        }
      });
  }
  handleSelectedValue(event:string){
    this.router.navigate([event], {relativeTo:this.route});
  }

}
