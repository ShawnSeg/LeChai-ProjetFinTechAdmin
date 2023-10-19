import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowsDataComponent } from './rows-data.component';

describe('RowsDataComponent', () => {
  let component: RowsDataComponent;
  let fixture: ComponentFixture<RowsDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RowsDataComponent]
    });
    fixture = TestBed.createComponent(RowsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
