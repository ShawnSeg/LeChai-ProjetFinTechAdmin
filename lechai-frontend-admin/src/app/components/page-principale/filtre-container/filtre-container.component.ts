import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild, ElementRef, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { RoutingService } from 'src/app/services/routing.service';
import { Services } from 'src/app/services/services.service';
import { ParamsURLService } from 'src/app/services/params-url.service';
import { ParamInfoResume } from 'src/Interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtre-container',
  templateUrl: './filtre-container.component.html',
  styleUrls: ['./filtre-container.component.scss']
})
export class FiltreContainerComponent {
  @ViewChild('fleche', { static: true }) fleche?: ElementRef;


  @Input() nomPageControlleur?: string;
  controllerName$:Observable<string>
  @Output() nomPageControlleurChange = new EventEmitter<string>();
  @Output() filtresChange = new EventEmitter<ParamInfoResume[]>();

  filtres: ParamInfoResume[] = [];
  filtresLoaded: boolean = false;

  constructor(private routingService: RoutingService, private service:Services, private route:ActivatedRoute) {
    this.controllerName$=this.service.name$
  }

  ngOnInit() {
    /*this.controllerName$.subscribe((value) => {
      this.nomPageControlleur = value;
      this.callRoutingService(this.nomPageControlleur);
    });*/

    this.route.paramMap.subscribe(params => {
      let name = params.get('name');
      console.log('ID from URL:', name);

      if (name !== null) {
        this.nomPageControlleur = name;
        this.callRoutingService(this.nomPageControlleur);
        /* this.changeControl.emit(this.selectedControlleur); /
        this.services.setControllerName(name);
        / console.log(this.controllerName$) */

      }

  })
}



  callRoutingService(value: string | undefined) {
    this.routingService.getAPIRouteURL({}, value!, 'info/filters').subscribe({
      next: (data: any) => {
        console.log(data);
        let testFiltre:ParamInfoResume[]=data
        this.filtres = testFiltre.sort((a, b) => a.ind - b.ind);
        this.filtresLoaded = true; // Set the flag to indicate that data is loaded.
        this.filtresChange.emit(this.filtres)

      },
      error: (error: HttpErrorResponse) => {
        console.log(error.status);
      }
    });
  }


}
