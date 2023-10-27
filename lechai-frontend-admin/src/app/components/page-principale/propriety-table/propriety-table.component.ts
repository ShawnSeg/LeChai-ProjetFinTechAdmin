import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild, ElementRef, Input, EventEmitter } from '@angular/core';
import { ParamInfoResume, ProprietyResum } from 'src/Interface';
import { RouteTypes, RoutingService } from 'src/app/services/routing.service';
import { ToastService } from 'src/app/services/toast.service';
import { Observable } from 'rxjs';
import { ParamsURLService } from 'src/app/services/params-url.service';

@Component({
  selector: 'app-propriety-table',
  templateUrl: './propriety-table.component.html',
  styleUrls: ['./propriety-table.component.scss']
})
export class ProprietyTableComponent {

  proprietes: ParamInfoResume[] = [
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


  nomControlleur: string | null = null;

  dataRow:any[] = [];
  proprietiesResum: ProprietyResum[] = [];



  constructor(private routingSevice:RoutingService, private toast: ToastService, private services:ParamsURLService){
  }

  ngOnInit(){
    console.log(this.nomControlleur);

    this.nomControlleur = this.services.returnParamsURL();
  }

  updateData(params:{[Key:string]: Object}){

    this.routingSevice.getAPIRouteURL<any>(params, this.nomControlleur!, "GetAll")
    .subscribe({
      next: (data: any) => {
        // Handle successful response here
        this.dataRow = data;

      },
      error: (error: HttpErrorResponse) => {
        // Handle error response here
        this.toast.showToast("error", 'Les détails des propriéter n\'ont pas été bien charger.', "bottom-center", 4000);
        console.error('Status code:', error.status);

      }
    });
  }

  getpropreities(){
    this.routingSevice.getAPIRouteURL({}, this.nomControlleur!, "Info/Proprieties")
      .subscribe({
        next: (data: any) => {
          console.log(data);
          // Handle successful response here
          this.proprietes = data;

          this.proprietiesResum = this.proprietes.map(prop => ({
            showTypeID: prop.showTypeID,
            params: prop.paramAffecteds.map(varsAffected => varsAffected.name)
        }));

          this.updateData({});
        },
        error: (error: HttpErrorResponse) => {
          // Handle error response here
          this.toast.showToast("error", 'Les propriéter du header n\'ont pas bien été charger.', "bottom-center", 4000);
          console.error('Status code:', error.status);

        }
      });
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
