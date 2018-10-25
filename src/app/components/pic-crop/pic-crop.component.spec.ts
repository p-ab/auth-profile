import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicCropComponent } from './pic-crop.component';

describe('PicCropComponent', () => {
  let component: PicCropComponent;
  let fixture: ComponentFixture<PicCropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicCropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicCropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
