import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxDisplayItemComponent } from './check-box-display-item.component';

describe('CheckBoxDisplayItemComponent', () => {
  let component: CheckBoxDisplayItemComponent;
  let fixture: ComponentFixture<CheckBoxDisplayItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckBoxDisplayItemComponent]
    });
    fixture = TestBed.createComponent(CheckBoxDisplayItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
