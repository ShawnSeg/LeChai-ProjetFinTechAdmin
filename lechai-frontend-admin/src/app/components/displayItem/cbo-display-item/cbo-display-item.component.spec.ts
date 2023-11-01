import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CboDisplayItemComponent } from './cbo-display-item.component';

describe('CboDisplayItemComponent', () => {
  let component: CboDisplayItemComponent;
  let fixture: ComponentFixture<CboDisplayItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CboDisplayItemComponent]
    });
    fixture = TestBed.createComponent(CboDisplayItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
