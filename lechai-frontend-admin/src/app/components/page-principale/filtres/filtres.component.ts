import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { APICallerService } from '../../../apicaller.service';
import { ActivatedRoute } from '@angular/router';
import { URLParserService } from '../../../urlparser.service';
import { Entryies, ObjectEntry } from '../../../generalInterfaces';
import { DisplayItemContainerComponent, ItemContainerTypes } from '../display-item-container/display-item-container.component';
import { FilterResume } from '../../../DisplayItemsInterfaces';
@Component({
  selector: 'app-filtres',
  templateUrl: './filtres.component.html',
  styleUrls: ['./filtres.component.scss']
})
export class FiltresComponent implements OnInit {

  @ViewChild('fleche', { static: true }) fleche?: ElementRef;
  ControllerName = "";
  @ViewChild('filtersContainer') container! : DisplayItemContainerComponent;
  filterHidden = true;
  FilterResumes:FilterResume[] = []
  ItemContainerTypes = ItemContainerTypes;
  @Output() filters  = new EventEmitter<{[key:string]:any}>()

  constructor(private URLParser : URLParserService, private caller:APICallerService, private route : ActivatedRoute) {
  }
  ngOnInit()
  {
    this.URLParser.GetControlleurSub(this.route).subscribe(name => {

      console.log(name);

      if(this.ControllerName != name)
      {
        this.ControllerName = name;
        this.FilterResumes = [];
      }

    })

  }
  updateFilters(filters : {[key:string]:any}, normalUpdate:boolean = true)
  {
    console.log(normalUpdate)
    this.FilterResumes = normalUpdate ? this.container.paramsByDisplayName() : [];

    this.URLParser.ChangeURL("filters", filters, this.route, normalUpdate);
    /* this.URLParser.updateFilters(filters); */
    this.filters.emit(filters)
  }
  toggleHide() {

    const fleche = this.fleche?.nativeElement as HTMLElement;

    if(fleche)
    {
      if (fleche.classList.contains('rotate-image')) {
        fleche.classList.remove('rotate-image');
        fleche.classList.add('rotate-image2');
        this.filterHidden = true;

      } else {
        fleche.classList.add('rotate-image');
        fleche.classList.remove('rotate-image2');
        this.filterHidden = false;

      }
    }

  }

  refreshFiltres()
  {
    this.filters.emit(this.container.paramsValue);
  }
}
