import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DisplayItemTemplate } from '../../page-principale/display-item-container/display-item-container.component';
import { Entryies, ObjectEntry } from '../../../generalInterfaces';
import { ParamInfoResume, defaultParamInfo } from '../../../DisplayItemsInterfaces';
import { APICallerService } from 'src/app/apicaller.service';

@Component({
  selector: 'app-image-display-item',
  templateUrl: './image-display-item.component.html',
  styleUrls: ['./image-display-item.component.scss']
})
export class ImageDisplayItemComponent implements OnInit, DisplayItemTemplate{

  @Input() valuePairs : ObjectEntry = { key: '', value: null };
  @Output() push = new EventEmitter();
  @ViewChild('inputImage') explorateur! : ElementRef;
  @ViewChild('imagePresente') image! : ElementRef;
  @Input() paramInfoResume: ParamInfoResume = defaultParamInfo();
  @Input() isUpdatable: boolean = false;
  str:string = "";
  baseURL : string

  constructor(private caller : APICallerService) {
    this.baseURL = caller.baseURL;
  }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    if (this.valuePairs.value != null)
    {
      this.str = this.valuePairs.value;
    }

  }
  updateValue(value : string)
  {
    console.log(value)
    if (!value)
      this.valuePairs.value = null;
    else
      this.valuePairs.value = value;

    if(!value || this.checkIfValide())
      this.pushValue();
  }
  pushValue()
  {
    this.push.emit(this.valuePairs);

  }

  getURL()
  {
    if(!this.valuePairs.value)
      return "";

    return this.baseURL + '/GetImage/' + this.valuePairs.value;
  }

  checkIfValide()
  {
    return !!this.valuePairs.value
  }

  insertImg()
  {
    this.explorateur.nativeElement.click();
  }

  afficherImage(event: any)
  {
    const image = event.target as HTMLInputElement;

    console.log(this.explorateur.nativeElement.value)
    //this.updateValue(this.explorateur.nativeElement.value)
    //this.image.nativeElement.src = this.explorateur.nativeElement.value;


    if (image.files && image.files.length > 0) {

      var readerURL = new FileReader();
      var readerBuffer = new FileReader();

      var file = image.files[0];

      readerURL.onload = (e: ProgressEvent<FileReader>) => {

        if(e.target == null)
          return

        this.image.nativeElement.src = e.target.result;

      }

      readerBuffer.onload = (e: ProgressEvent<FileReader>) => {

        console.log(e);

        if(e.target == null || e.target.result == null)
          return

        let base64String = e.target.result;

        if(typeof base64String != "string")
        {
          const uint8Array = new Uint8Array(base64String);
          base64String = btoa(String.fromCharCode(...uint8Array));
        }

        this.caller.Post({image : base64String, nomImage : file.name}, "/upload").subscribe(() => {
          this.updateValue(file.name);

        })

      }

      readerURL.readAsDataURL(file)
      readerBuffer.readAsArrayBuffer(file);

      /* const file = image.files[0];

      console.log('File object:', file);

      // Créer un objet FormData et y ajouter le champ de fichier
      const formData = new FormData();
      formData.append('file', file);

      console.log('Form data object:', formData); */




    }
  }
}
