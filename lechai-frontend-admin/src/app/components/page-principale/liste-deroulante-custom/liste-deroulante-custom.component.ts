import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-liste-deroulante-custom',
  templateUrl: './liste-deroulante-custom.component.html',
  styleUrls: ['./liste-deroulante-custom.component.scss']
})
export class ListeDeroulanteCustomComponent implements OnInit{
  @Input() values: string[] = [];
  @Input() baseValue?: string;
  @Output() selectedValue = new EventEmitter<string>();

  searchQuery = '';
  showDropdown = false;
  filteredValues: string[] = [];

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
    if (this.searchQuery === '') {
      this.showDropdown = false;
      this.filteredValues = [];
    } else {
      this.filteredValues = this.values.filter((value) =>
        value.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.showDropdown = true;
    }
  }

  selectValue(value: string) {
    this.searchQuery = value;
    this.showDropdown = false;
    this.selectedValue.emit(value);
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
