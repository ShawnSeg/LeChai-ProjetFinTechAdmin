import { Component, Input } from '@angular/core';
import { ProprietyResum } from 'src/Interface';

@Component({
  selector: 'app-rows-data',
  templateUrl: './rows-data.component.html',
  styleUrls: ['./rows-data.component.scss'],
})
export class RowsDataComponent {

  @Input() data:any[] = [];
  @Input() proprieties: ProprietyResum[] = [];

  ngOnInit(){
    console.log(this.proprieties)
    console.log(this.data)

  }




}
