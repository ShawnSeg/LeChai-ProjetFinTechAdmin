import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltresNiv2Component } from './filtres-niv2.component';

describe('FiltresNiv2Component', () => {
  let component: FiltresNiv2Component;
  let fixture: ComponentFixture<FiltresNiv2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltresNiv2Component]
    });
    fixture = TestBed.createComponent(FiltresNiv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
