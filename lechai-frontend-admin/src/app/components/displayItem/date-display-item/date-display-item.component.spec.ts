import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateDisplayItemComponent } from './date-display-item.component';

describe('DateDisplayItemComponent', () => {
  let component: DateDisplayItemComponent;
  let fixture: ComponentFixture<DateDisplayItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DateDisplayItemComponent]
    });
    fixture = TestBed.createComponent(DateDisplayItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
