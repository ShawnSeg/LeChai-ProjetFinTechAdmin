import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdpOublierEnvoiComponent } from './mdp-oublier-envoi.component';

describe('MdpOublierEnvoiComponent', () => {
  let component: MdpOublierEnvoiComponent;
  let fixture: ComponentFixture<MdpOublierEnvoiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MdpOublierEnvoiComponent]
    });
    fixture = TestBed.createComponent(MdpOublierEnvoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
