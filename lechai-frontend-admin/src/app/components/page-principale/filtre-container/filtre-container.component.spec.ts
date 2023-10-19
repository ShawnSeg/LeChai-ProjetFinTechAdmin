import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltreContainerComponent } from './filtre-container.component';

describe('FiltreContainerComponent', () => {
  let component: FiltreContainerComponent;
  let fixture: ComponentFixture<FiltreContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltreContainerComponent]
    });
    fixture = TestBed.createComponent(FiltreContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
