import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild, ElementRef, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { RoutingService } from 'src/app/services/routing.service';
import { ParamInfoResume } from 'src/shawnInterface';

@Component({
  selector: 'app-filtre-container',
  templateUrl: './filtre-container.component.html',
  styleUrls: ['./filtre-container.component.scss']
})
export class FiltreContainerComponent {
  @ViewChild('fleche', { static: true }) fleche?: ElementRef;
  @ViewChild('container', { static: true }) container?: ElementRef;

  @Input() nomPageControlleur?: string;
  @Output() nomPageControlleurChange = new EventEmitter<string>();
  @Output() filtresChange = new EventEmitter<ParamInfoResume[]>();

  filtres: ParamInfoResume[] = [];
  filtresLoaded: boolean = false;

  constructor(private routingService: RoutingService) {}

  ngOnInit() {
    this.callRoutingService(this.nomPageControlleur);
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('nomPageControlleur' in changes) {
      const newValue = changes['nomPageControlleur'].currentValue;
      this.callRoutingService(newValue);
    }
  }

  callRoutingService(value: string | undefined) {
    this.routingService.getAPIRouteURL({}, value!, 'info/filters').subscribe({
      next: (data: any) => {
        console.log(data);
        this.filtres = data;
        this.filtresLoaded = true; // Set the flag to indicate that data is loaded.
        this.filtresChange.emit(this.filtres)

      },
      error: (error: HttpErrorResponse) => {
        console.log(error.status);
      }
    });
  }


}
