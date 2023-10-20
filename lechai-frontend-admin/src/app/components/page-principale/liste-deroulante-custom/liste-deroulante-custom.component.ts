import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-liste-deroulante-custom',
  templateUrl: './liste-deroulante-custom.component.html',
  styleUrls: ['./liste-deroulante-custom.component.scss']
})
export class ListeDeroulanteCustomComponent {
  @Input() values: string[] = [];
  @Output() selectedValue = new EventEmitter<string>();

  searchQuery = '';
  showDropdown = false;
  filteredValues: string[] = [];

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
}
