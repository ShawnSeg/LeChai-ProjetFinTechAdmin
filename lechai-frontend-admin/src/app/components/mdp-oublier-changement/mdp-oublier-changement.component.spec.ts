import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdpOublierChangementComponent } from './mdp-oublier-changement.component';

describe('MdpOublierChangementComponent', () => {
  let component: MdpOublierChangementComponent;
  let fixture: ComponentFixture<MdpOublierChangementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MdpOublierChangementComponent]
    });
    fixture = TestBed.createComponent(MdpOublierChangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
