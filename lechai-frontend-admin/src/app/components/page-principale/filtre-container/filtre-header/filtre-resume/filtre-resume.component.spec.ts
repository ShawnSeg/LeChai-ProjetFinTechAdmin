import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltreResumeComponent } from './filtre-resume.component';

describe('FiltreResumeComponent', () => {
  let component: FiltreResumeComponent;
  let fixture: ComponentFixture<FiltreResumeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltreResumeComponent]
    });
    fixture = TestBed.createComponent(FiltreResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
