import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionDisplayItemComponent } from './description-display-item.component';

describe('DescriptionDisplayItemComponent', () => {
  let component: DescriptionDisplayItemComponent;
  let fixture: ComponentFixture<DescriptionDisplayItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescriptionDisplayItemComponent]
    });
    fixture = TestBed.createComponent(DescriptionDisplayItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
