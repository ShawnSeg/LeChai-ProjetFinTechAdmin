import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { Proprietes, Details } from 'src/Interface';
import { RouteTypes, RoutingService } from 'src/app/services/routing.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-propriety-table',
  templateUrl: './propriety-table.component.html',
  styleUrls: ['./propriety-table.component.scss']
})
export class ProprietyTableComponent {

  proprietes: Proprietes[] = [
/*     {
      name: "id",
    },
    {
      name: "nom",
    },
    {
      name: "prix",
    },
    {
      name: "description",
    }, */
  ];

  allDetails: Details[] = [
   /*  {
      details: [1, 2, 3],
    },
    {
      details: ["chai", "dirty chai", "chandail"],
    },
    {
      details: [18, 20, 25],
    },
    {
      details: ["dahkjdhsjakshdjahxjkhjkhsjkhfjkdshfjshfkjshfjkshfdjkshfjdhfdjkshfjkdhkjhllkjhdjkashjdksajkdhajkhdjksahjdkhasjkdsadjkashdjksahjkdhsajkhdkjsahdkjsahdjkhdajkhsakjdhaskjdhkjah", 20, 25],
    }, */

  ];


  nbDetail = 0;
  selectionner = false;
  /* @ViewChild('elem') element?: ElementRef; */
  @Input() nomControlleur?: string;


  constructor(private routingSevice:RoutingService, private toast: ToastService){


  }

  ngOnInit(){
    this.routingSevice.getAPIRouteURL<Proprietes>({}, this.nomControlleur!, "Info/Proprieties")
      .subscribe({
        next: (data: any) => {
          // Handle successful response here
          this.proprietes = data;
          this.updateData({});
        },
        error: (error: HttpErrorResponse) => {
          // Handle error response here
          this.toast.showToast("error", 'Le chargement de la page n\'a pas bien été fait.', "bottom-center", 4000);
          console.error('Status code:', error.status);

        }
      });

    this.compteDetails();
  }

  updateData(params:{[Key:string]: Object}){

    this.routingSevice.getAPIRouteURL<any>(params, this.nomControlleur!, "GetAll")
    .subscribe({
      next: (data: any) => {
        // Handle successful response here



        for(let item of data)
        {

        }
      },
      error: (error: HttpErrorResponse) => {
        // Handle error response here
        this.toast.showToast("error", 'Le chargement de la page n\'a pas bien été fait.', "bottom-center", 4000);
        console.error('Status code:', error.status);

      }
    });
  }


  compteDetails()
  {
    let nb = 0;

    for (let det of this.allDetails) {
      nb = det.details.length;

      if (nb > this.nbDetail)
      {
        this.nbDetail = nb;
      }
    }
  }

  generateArray(nbDetails: number): number[] {
    return Array.from({ length: nbDetails }, (_, i) => i);
  }

/*   itemSelect(index: number){

    const element = this.element[index]?.nativeElement as HTMLElement;
    const classes = element.classList;
    console.log(classes); // Affiche les classes de l'élément

    if(classes[1])
    {
      this.selectionner = false;
    }
    else{
      this.selectionner = true;
    }

  } */

}
