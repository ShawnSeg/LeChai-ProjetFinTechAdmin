import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayItemContainerComponent } from './display-item-container.component';

describe('DisplayItemContainerComponent', () => {
  let component: DisplayItemContainerComponent;
  let fixture: ComponentFixture<DisplayItemContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayItemContainerComponent]
    });
    fixture = TestBed.createComponent(DisplayItemContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
