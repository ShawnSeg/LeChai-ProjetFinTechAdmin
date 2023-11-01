import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-liste-deroulante-custom',
  templateUrl: './liste-deroulante-custom.component.html',
  styleUrls: ['./liste-deroulante-custom.component.scss']
})
export class ListeDeroulanteCustomComponent {
  @Input() values: { [id: string]: any } = {}
  @Input() baseValue?: string;
  @Output() selectedValue = new EventEmitter<string>();

  searchQuery = '';
  showDropdown = false;
  filteredValues: { [id: string]: string } = {};

  ngOnInit(){
    if(this.baseValue)
    {
      this.searchQuery = this.baseValue;
    }
  }

  showValues() {
    this.filteredValues = this.values;
    this.showDropdown = true;
  }

  filterValues() {
    this.filteredValues = {};
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
    console.log(id)
    this.selectedValue.emit(id);
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
