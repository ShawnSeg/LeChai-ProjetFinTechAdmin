import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoueCouleurDisplayItemComponent } from './roue-couleur-display-item.component';

describe('RoueCouleurDisplayItemComponent', () => {
  let component: RoueCouleurDisplayItemComponent;
  let fixture: ComponentFixture<RoueCouleurDisplayItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoueCouleurDisplayItemComponent]
    });
    fixture = TestBed.createComponent(RoueCouleurDisplayItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
