import { Component, Input, SimpleChanges, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ParamInfoResume } from 'src/shawnInterface';
import { RoutingService } from 'src/app/services/routing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { FiltresValuesService } from 'src/app/services/filtres-values.service';

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


  constructor(private routingService:RoutingService, private filtresValues:FiltresValuesService){
    this.subscription = this.filtresValues.isHide$.subscribe(isHide => {
      if (isHide) {
        (this.container?.nativeElement as HTMLElement).classList.add('hide');

      } else {

        (this.container?.nativeElement as HTMLElement).classList.remove('hide');
      }
    });
  }

  ngOnInit() {
    //this.callRoutingService(this.nomPageControlleur);
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
      console.log(newValue); // Log the updated filtres when it changes.
      this.filtres = newValue;
      this.filtresChange.emit(this.filtres)
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

}
