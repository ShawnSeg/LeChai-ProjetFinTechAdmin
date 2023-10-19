import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltreHeaderComponent } from './filtre-header.component';

describe('FiltreHeaderComponent', () => {
  let component: FiltreHeaderComponent;
  let fixture: ComponentFixture<FiltreHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltreHeaderComponent]
    });
    fixture = TestBed.createComponent(FiltreHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
