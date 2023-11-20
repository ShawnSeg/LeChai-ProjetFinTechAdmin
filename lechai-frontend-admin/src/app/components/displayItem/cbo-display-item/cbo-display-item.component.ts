import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DisplayItemTemplate } from 'src/app/components/page-principale/display-item-container/display-item-container.component';
import { Entryies, ObjectEntry } from 'src/app/generalInterfaces';
import { ParamInfoResume, defaultParamInfo } from 'src/app/DisplayItemsInterfaces';
import { APICallerService } from 'src/app/apicaller.service';
import { ListeDeroulanteCustomComponent } from '../../page-principale/liste-deroulante-custom/liste-deroulante-custom.component';
import { ItemContainerTypes } from 'src/app/components/page-principale/display-item-container/display-item-container.component';
@Component({
  selector: 'app-cbo-display-item',
  templateUrl: './cbo-display-item.component.html',
  styleUrls: ['./cbo-display-item.component.scss']
})
export class CboDisplayItemComponent implements OnInit, DisplayItemTemplate{
  @Input() valuePairs : ObjectEntry = { key: '', value: null };
  @Output() push = new EventEmitter();
  @Output() insert = new EventEmitter();
  @ViewChild('inputValue') input! : ListeDeroulanteCustomComponent;
  @Input() paramInfoResume: ParamInfoResume = defaultParamInfo();
  @Input() isUpdatable: boolean = false;
  listValeurPossible:{[key:string]:any}={}
  ItemContainerTypes = ItemContainerTypes;
  displayItemInfos? : ParamInfoResume[] = undefined;
  showInsert = false;

  constructor(private caller:APICallerService) {}
  ngOnInit(): void {

    this.getValues(this.valuePairs.value);

    this.caller.Get<ParamInfoResume[]>({}, this.paramInfoResume.mapper?.refController!, "InfoRoute/Insert").subscribe(data=>{
      this.displayItemInfos = data;
    })
  }

  getValues(valueToBind: string | boolean | null)
  {
    if(!this.paramInfoResume.mapper)
      return

    this.caller.Get<{[key:string]:any}>({}, this.paramInfoResume.mapper.refController, "CBO").subscribe(data=>{
      this.listValeurPossible=data;

      if(valueToBind != null)
      {

        if(typeof valueToBind == "boolean")
        {
          let objectKeys = Object.keys(data);
          let lastKey = objectKeys[objectKeys.length-1];
/*           this.valuePairs.value = lastKey; */
          this.paramInfoResume.showValue = data[lastKey];
          this.input.selectValue(lastKey);
        }
        else
        {
          this.paramInfoResume.showValue = this.listValeurPossible[valueToBind];
        }
        this.pushValue()
      }
    })
  }

  updateValue(value : ObjectEntry)
  {
    if (!value)
      {
        this.valuePairs.value = null;
        this.paramInfoResume.showValue = undefined
      }
    else
      {
        this.valuePairs.value = value.key;
        this.paramInfoResume.showValue = value.value
      }

    this.pushValue();
  }

  pushValue()
  {
    this.push.emit(this.valuePairs);
  }

  insertCBO(){
    this.showInsert = true;
  }

  pushRoute(params : {[key:string]:any})
  {

    this.showInsert = false;

    if(!params || Object.keys(params).length == 0)
      return;


    this.caller.Post(params, this.paramInfoResume.mapper?.refController!, "Insert").subscribe(()=>{
      this.getValues(true);
    })



    //this.insert.emit(true);
  }
}
