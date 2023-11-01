import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntDisplayItemComponent } from './int-display-item.component';

describe('IntDisplayItemComponent', () => {
  let component: IntDisplayItemComponent;
  let fixture: ComponentFixture<IntDisplayItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntDisplayItemComponent]
    });
    fixture = TestBed.createComponent(IntDisplayItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
