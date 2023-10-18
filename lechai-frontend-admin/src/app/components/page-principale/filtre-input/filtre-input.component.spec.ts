import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltreInputComponent } from './filtre-input.component';

describe('FiltreInputComponent', () => {
  let component: FiltreInputComponent;
  let fixture: ComponentFixture<FiltreInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltreInputComponent]
    });
    fixture = TestBed.createComponent(FiltreInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
