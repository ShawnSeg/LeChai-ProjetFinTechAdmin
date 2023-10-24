import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { APICallerService } from '../apicaller.service';
import { ActivatedRoute } from '@angular/router';
import { URLParserService } from '../urlparser.service';
import { Entryies, ObjectEntry } from '../generalInterfaces';
import { DisplayItemContainerComponent, ItemContainerTypes } from '../display-item-container/display-item-container.component';
import { FilterResume } from '../DisplayItemsInterfaces';
@Component({
  selector: 'app-filtres',
  templateUrl: './filtres.component.html',
  styleUrls: ['./filtres.component.scss']
})
export class FiltresComponent implements OnInit {

  @ViewChild('fleche', { static: true }) fleche?: ElementRef;
  @Input() ControllerName = "";
  @ViewChild('filtersContainer') container! : DisplayItemContainerComponent;
  filterHidden = true;
  FilterResumes:FilterResume[] = []
  ItemContainerTypes = ItemContainerTypes;
  constructor(private URLParser : URLParserService, private caller:APICallerService, private route : ActivatedRoute) {}
  ngOnInit()
  {
  }
  updateFilters(filters : {[key:string]:any})
  {
    this.FilterResumes = this.container.paramsByDisplayName();
    this.URLParser.ChangeURL("filters", filters, this.route);
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
}
