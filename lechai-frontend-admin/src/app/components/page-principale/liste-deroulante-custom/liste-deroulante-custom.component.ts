import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ObjectEntry } from 'src/app/generalInterfaces';

@Component({
  selector: 'app-liste-deroulante-custom',
  templateUrl: './liste-deroulante-custom.component.html',
  styleUrls: ['./liste-deroulante-custom.component.scss']
})
export class ListeDeroulanteCustomComponent {
  @Input() values: { [id: string]: any } = {}
  @Input() baseValue?: string;
  @Output() selectedValue = new EventEmitter<ObjectEntry>();
  @Input()
  set setValue(values: { [id: string]: any } )
  {
    this.values = values

    if(this.baseValue)
      this.searchQuery = this.values[this.baseValue]
  }

  searchQuery = '';
  showDropdown = false;
  filteredValues: { [id: string]: string } = {};

  ngOnInit(){
  }

/*   ngAfterViewInit()
  {
    console.log(this.values)
    console.log(this.baseValue)
    if(this.baseValue)
      this.searchQuery = this.values[this.baseValue]
  }
 */

  showValues() {
    this.filteredValues = this.values;
    this.showDropdown = true;
  }

  filterValues() {

    this.filteredValues = {};

    if(!this.searchQuery)
      this.selectedValue.emit(undefined)

    for (const id in this.values) {
      if (this.values[id].toLowerCase().startsWith(this.searchQuery.toLowerCase())) {
        this.filteredValues[id] = this.values[id];
      }
    }
    this.showDropdown = true;
  }

  selectValue(id: string) {
    this.searchQuery = this.filteredValues[id];
    this.showDropdown = false;
    this.selectedValue.emit({key: id, value:this.searchQuery});
  }

  setBaseValue(id: string)
  {
    this.searchQuery = this.values[id];
  }

  getFilteredValueIds() {
    return Object.keys(this.filteredValues);
  }
  closeDropdown(){
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }

  updateValue(name : string)
  {
    if(this.searchQuery != name)
      this.searchQuery = name;
  }


}
