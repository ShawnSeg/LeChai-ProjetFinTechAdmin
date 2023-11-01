import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDisplayItemComponent } from './image-display-item.component';

describe('ImageDisplayItemComponent', () => {
  let component: ImageDisplayItemComponent;
  let fixture: ComponentFixture<ImageDisplayItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageDisplayItemComponent]
    });
    fixture = TestBed.createComponent(ImageDisplayItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
