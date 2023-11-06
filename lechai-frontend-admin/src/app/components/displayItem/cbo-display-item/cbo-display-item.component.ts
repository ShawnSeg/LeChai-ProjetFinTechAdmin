import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DisplayItemTemplate } from 'src/app/components/page-principale/display-item-container/display-item-container.component';
import { Entryies, ObjectEntry } from 'src/app/generalInterfaces';
import { ParamInfoResume, defaultParamInfo } from 'src/app/DisplayItemsInterfaces';
import { APICallerService } from 'src/app/apicaller.service';
import { ListeDeroulanteCustomComponent } from '../../page-principale/liste-deroulante-custom/liste-deroulante-custom.component';

@Component({
  selector: 'app-cbo-display-item',
  templateUrl: './cbo-display-item.component.html',
  styleUrls: ['./cbo-display-item.component.scss']
})
export class CboDisplayItemComponent implements OnInit, DisplayItemTemplate{
  @Input() valuePairs : ObjectEntry = { key: '', value: null };
  @Output() push = new EventEmitter();
  @ViewChild('inputValue') input! : ListeDeroulanteCustomComponent;
  @Input() paramInfoResume: ParamInfoResume = defaultParamInfo();
  listValeurPossible:{[key:string]:any}={}
  constructor(private caller:APICallerService) {}
  ngOnInit(): void {
    console.log(this.valuePairs)
    if(this.paramInfoResume.mapper)
    this.caller.Get<{[key:string]:any}>({}, this.paramInfoResume.mapper.refController, "CBO").subscribe(data=>{
      this.listValeurPossible=data;

      if(this.valuePairs.value)
        {
          this.paramInfoResume.showValue = this.listValeurPossible[this.valuePairs.value]
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
}
