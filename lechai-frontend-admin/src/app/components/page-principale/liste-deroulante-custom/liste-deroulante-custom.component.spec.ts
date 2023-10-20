import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDeroulanteCustomComponent } from './liste-deroulante-custom.component';

describe('ListeDeroulanteCustomComponent', () => {
  let component: ListeDeroulanteCustomComponent;
  let fixture: ComponentFixture<ListeDeroulanteCustomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeDeroulanteCustomComponent]
    });
    fixture = TestBed.createComponent(ListeDeroulanteCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
