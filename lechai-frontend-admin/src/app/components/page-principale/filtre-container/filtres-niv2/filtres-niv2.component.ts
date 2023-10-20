import { Component, Input, SimpleChanges, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ParamInfoResume } from 'src/Interface';
import { RoutingService } from 'src/app/services/routing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { FiltresValuesService } from 'src/app/services/filtres-values.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-filtres-niv2',
  templateUrl: './filtres-niv2.component.html',
  styleUrls: ['./filtres-niv2.component.scss']
})
export class FiltresNiv2Component {
  //@Input() nomPageControlleur?: string;
  @Input() filtres?: ParamInfoResume[];

  @Output() filtresChange = new EventEmitter<ParamInfoResume[]>();

  @ViewChild('container', { static: true }) container?: ElementRef;

  private subscription: Subscription;

  //filtres: ParamInfoResume[] = [];
  filtresLoaded: boolean = false;
  controllerName?:string


  constructor(private routingService:RoutingService, private filtresValues:FiltresValuesService, private router:Router, private route:ActivatedRoute, private location:Location){
    this.subscription = this.filtresValues.isHide$.subscribe(isHide => {
      if (isHide) {
        (this.container?.nativeElement as HTMLElement).classList.add('hide');

      } else {

        (this.container?.nativeElement as HTMLElement).classList.remove('hide');
      }
    });
  }

  ngOnInit() {
    /*
    this.route.paramMap.subscribe(params => {
      let name = params.get('name');
      console.log('ID from URL:', name);

      if (name !== null && name!= this.controllerName) {
        this.controllerName = name;
        console.log(this.controllerName)
        /* this.changeControl.emit(this.selectedControlleur); /
        this.services.setControllerName(name);
        / console.log(this.controllerName$)

      }
 })
    //this.callRoutingService(this.nomPageControlleur);
    */
  }

  ngOnChanges(changes: SimpleChanges) {
   /* if ('nomPageControlleur' in changes) {
      const newValue = changes['nomPageControlleur'].currentValue;
      console.log(newValue); // Log the updated filtres when it changes.
      this.nomPageControlleur = newValue;
      this.callRoutingService(newValue);
    */
    if ('filtres' in changes) {
      const newValue = changes['filtres'].currentValue;
      //console.log(newValue); // Log the updated filtres when it changes.
      this.filtres = newValue;

    }
  }

  ngOnDestroy() {
    // Don't forget to unsubscribe to prevent memory leaks
    this.subscription.unsubscribe();
  }

  callRoutingService(value: string | undefined) {
    this.routingService.getAPIRouteURL({}, value!, 'info/filters').subscribe({
      next: (data: any) => {
        console.log(data);
        let testFiltre:ParamInfoResume[]=data
        this.filtres = testFiltre.sort((a, b) => a.ind - b.ind);
        this.filtresLoaded = true; // Set the flag to indicate that data is loaded.
        console.log(this.filtres)

      },
      error: (error: HttpErrorResponse) => {
        console.log(error.status);
      }
    });
  }

  changeFiltre(eventData:{name:string, value:string})
  {
    let nom = eventData.name
    let valeur = eventData.value
    console.log(eventData.name)
    console.log(this.controllerName)

    let testArray = [eventData.name, eventData.value]

    const url = this.router.createUrlTree([], {relativeTo: this.route, queryParams: {nom: testArray}}).toString()
    //this.router.navigate([{nom: valeur}], { relativeTo: this.route });
    this.location.go(url)

    let test:{[key:string]:string|null}={}
    const paramMap = this.route.snapshot.queryParamMap
    this.route.queryParams.subscribe(params=>{
      console.log(params)
    })

    paramMap.keys.forEach(key => {
      test[key]=paramMap.get(key)

    });

  }

}
