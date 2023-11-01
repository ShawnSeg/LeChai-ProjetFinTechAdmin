import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatDisplayItemComponent } from './float-display-item.component';

describe('FloatDisplayItemComponent', () => {
  let component: FloatDisplayItemComponent;
  let fixture: ComponentFixture<FloatDisplayItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FloatDisplayItemComponent]
    });
    fixture = TestBed.createComponent(FloatDisplayItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
