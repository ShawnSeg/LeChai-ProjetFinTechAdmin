import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionControlleurComponent } from './selection-controlleur.component';

describe('SelectionControlleurComponent', () => {
  let component: SelectionControlleurComponent;
  let fixture: ComponentFixture<SelectionControlleurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectionControlleurComponent]
    });
    fixture = TestBed.createComponent(SelectionControlleurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
