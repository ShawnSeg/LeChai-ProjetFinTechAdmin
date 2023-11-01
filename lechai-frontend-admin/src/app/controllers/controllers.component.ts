import { Component, OnInit } from '@angular/core';
import { APICallerService } from '../apicaller.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { URLParserService } from '../urlparser.service';
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
  constructor(private URLParser:URLParserService, private caller:APICallerService, private route : ActivatedRoute){}
  ngOnInit(): void {
    //this.URLParser.GetControllerName(this.route).subscribe(name => this.selectedController = name ?? "");
    this.URLParser.GetSubscription("controller", this.route, true).subscribe(name => this.selectedController = name ?? "")
    this.caller.Get<Controller[]>({}, "Info", "Controllers")
    .subscribe(data => {
      this.controllers = data;
      data.forEach((controller) => {
        this.controllersString[controller.name.toString()] = controller.name;
      });
      if (!this.selectedController || !this.controllers.some(controller => controller.name == this.selectedController))
        this.URLParser.ChangeURL("controller", this.controllers[0].name, this.route)
      //this.URLParser.ChangeControlerRoute(this.controllers[0].name, this.route)
      this.controllerOk = true;
    });
  }
  selectController(controllerName:string)
  {
    //this.URLParser.ChangeControlerRoute(controllerName, this.route)
    this.URLParser.ChangeURL("controller", controllerName, this.route)
  }
  filteredControllers() : Controller[]
  {
    return this.controllers.filter(controller => controller.isMain)
  }


}
