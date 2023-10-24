import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StringDisplayItemComponent } from './string-display-item.component';

describe('StringDisplayItemComponent', () => {
  let component: StringDisplayItemComponent;
  let fixture: ComponentFixture<StringDisplayItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StringDisplayItemComponent]
    });
    fixture = TestBed.createComponent(StringDisplayItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
