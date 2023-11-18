import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { APICallerService } from '../../../apicaller.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { URLParserService } from '../../../urlparser.service';
import { ListeDeroulanteCustomComponent } from '../liste-deroulante-custom/liste-deroulante-custom.component';
import { DataDisplayComponent } from '../data-display/data-display.component';
import { ObjectEntry } from 'src/app/generalInterfaces';
import { FiltresComponent } from '../filtres/filtres.component';

export interface Controller{
  id:number,
  name:string,
  isMain:boolean
}

@Component({
  selector: 'app-controllers',
  templateUrl: './controllers.component.html',
  styleUrls: ['./controllers.component.scss']
})
export class ControllersComponent implements OnInit{
  controllers: Controller[] = [];
  controllersString:{ [id: string]: string } = {};
  selectedController:string = "";
  testObject = 0;
  controllerOk = false;
  filters:  {[key:string]:any} = {}
  @ViewChild('listeDeroule') listeDeroule! : ListeDeroulanteCustomComponent;
  @ViewChild('dataDisplay') dataDisplay! : DataDisplayComponent;
  @ViewChild('filtres') filtres! : FiltresComponent;

  /* _ControllerName:string = "";

  @Input()
  set ControllerName(name : string)
  {
    this._ControllerName = name;
    console.log("!!!!!!!!!!!!!!")
  } */

  constructor(private URLParser:URLParserService, private caller:APICallerService, private route : ActivatedRoute){}
  ngOnInit(): void {


    if(!this.caller.isConnected())
      this.URLParser.noConnection()

    this.caller.Get<Controller[]>({}, "Info", "Controllers")
    .subscribe(data => {

    this.controllers = data;

    let control = this.URLParser.GetControlleur(this.route)

    if (!control || !this.controllers.some(controller => controller.name == control))
    {
      this.selectController(this.controllers[0].name)
    }
    else{
      this.selectedController = control;
      this.controllerOk = true;
    }
    //this.URLParser.GetControllerName(this.route).subscribe(name => this.selectedController = name ?? "");
    //this.URLParser.GetSubscription("controller", this.route, true).subscribe(name => this.selectedController = name ?? "")

      this.controllers.forEach((controller) => {
        this.controllersString[controller.name.toString()] = controller.name;
      });

    });
      //this.URLParser.ChangeControlerRoute(this.controllers[0].name, this.route)
  }
  selectController(controllerName:string)
  {
    this.controllerOk = false;
    //this.URLParser.ChangeControlerRoute(controllerName, this.route)
    this.URLParser.ChangeURL("controller", controllerName, this.route)

    if(controllerName != "")
      this.listeDeroule.updateValue(controllerName);

    this.selectedController = controllerName;
    this.controllerOk = true;

  }
  filteredControllers() : Controller[]
  {
    return this.controllers.filter(controller => controller.isMain)
  }

  updateFilters(filters:  {[key:string]:any})
  {
    this.dataDisplay.setFilters(filters);
  }

  refreshFiltres()
  {
    this.filtres.refreshFiltres()
  }

  toggleFunction(/* funct: RouteResumeBundle */) {
    /* if (this.selectedFunction === funct) {
      this.selectedFunction = undefined;
      this.toggleModalOverlayBackground(false);
      return;
    }
    this.selectedFunction = funct; */
    this.toggleModalOverlayBackground(true);
  }

  toggleModalOverlayBackground(isDarker: boolean) {
    // Delay the background color change using a timeout
    setTimeout(() => {
      const modalOverlay = document.querySelector('.modal-overlay') as HTMLElement;
      if (modalOverlay) {
        modalOverlay.style.animationName = isDarker ? 'none' : 'fadeOut';
        modalOverlay.style.backgroundColor = isDarker ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)';
      }
    });
  }
}
