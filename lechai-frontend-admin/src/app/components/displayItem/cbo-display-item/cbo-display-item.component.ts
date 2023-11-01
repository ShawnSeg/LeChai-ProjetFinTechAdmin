import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DisplayItemTemplate } from 'src/app/components/page-principale/display-item-container/display-item-container.component';
import { Entryies, ObjectEntry } from 'src/app/generalInterfaces';
import { ParamInfoResume, defaultParamInfo } from 'src/app/DisplayItemsInterfaces';
import { APICallerService } from 'src/app/apicaller.service';

@Component({
  selector: 'app-cbo-display-item',
  templateUrl: './cbo-display-item.component.html',
  styleUrls: ['./cbo-display-item.component.scss']
})
export class CboDisplayItemComponent implements OnInit, DisplayItemTemplate{
  @Input() valuePairs : ObjectEntry = { key: '', value: null };
  @Output() push = new EventEmitter();
  @ViewChild('inputValue') input! : ElementRef;
  @Input() paramInfoResume: ParamInfoResume = defaultParamInfo();
  listValeurPossible:{[key:string]:any}={}
  constructor(private caller:APICallerService) {}
  ngOnInit(): void {
<<<<<<<< HEAD:lechai-frontend-admin/src/app/display-item-container/cbo-display-item/cbo-display-item.component.ts

    if(this.paramInfoResume.mapper)
      this.caller.Get<{[key:string]:any}>({}, this.paramInfoResume.mapper.refController, "CBO").subscribe(data=>{this.listValeurPossible=data})
========
    /* console.log(this.paramInfoResume) */
>>>>>>>> dev:lechai-frontend-admin/src/app/components/displayItem/cbo-display-item/cbo-display-item.component.ts
  }
  ngAfterViewInit() {
    if (this.valuePairs.value != null)
      this.input.nativeElement.value = this.valuePairs.value;
  }
  updateValue(value : string)
  {
    if (!value)
      this.valuePairs.value = null;
    else
      this.valuePairs.value = value;
    this.pushValue();
  }
  pushValue()
  {
    this.push.emit(this.valuePairs);
  }
}
