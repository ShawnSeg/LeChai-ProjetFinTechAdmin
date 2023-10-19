import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltreMinMaxComponent } from './filtre-min-max.component';

describe('FiltreMinMaxComponent', () => {
  let component: FiltreMinMaxComponent;
  let fixture: ComponentFixture<FiltreMinMaxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltreMinMaxComponent]
    });
    fixture = TestBed.createComponent(FiltreMinMaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
