import { Component } from '@angular/core';
import { FooterPositionService } from 'src/app/services/footer-position.service';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss']
})
export class Page404Component {

  constructor(private footerPosition:FooterPositionService){

  }

  ngOnInit()
  {
    this.footerPosition.setIsAbsolute(true)
  }

}
