import { Component } from '@angular/core';
import { FooterPositionService } from 'src/app/services/footer-position.service';

@Component({
  selector: 'app-page-principale',
  templateUrl: './page-principale.component.html',
  styleUrls: ['./page-principale.component.scss']
})
export class PagePrincipaleComponent {

  constructor(private footerPosition:FooterPositionService) {}

  ngOnInit() {
    this.footerPosition.setIsAbsolute(false)
  }

}
