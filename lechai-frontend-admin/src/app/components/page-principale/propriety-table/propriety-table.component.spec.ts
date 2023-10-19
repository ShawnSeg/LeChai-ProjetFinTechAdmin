import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprietyTableComponent } from './propriety-table.component';

describe('ProprietyTableComponent', () => {
  let component: ProprietyTableComponent;
  let fixture: ComponentFixture<ProprietyTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProprietyTableComponent]
    });
    fixture = TestBed.createComponent(ProprietyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
