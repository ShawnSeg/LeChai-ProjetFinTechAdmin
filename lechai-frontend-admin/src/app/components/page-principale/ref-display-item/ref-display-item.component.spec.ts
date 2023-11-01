import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefDisplayItemComponent } from './ref-display-item.component';

describe('RefDisplayItemComponent', () => {
  let component: RefDisplayItemComponent;
  let fixture: ComponentFixture<RefDisplayItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RefDisplayItemComponent]
    });
    fixture = TestBed.createComponent(RefDisplayItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
