import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingPickerPageComponent } from './rating-picker-page.component';

describe('RatingPickerPageComponent', () => {
  let component: RatingPickerPageComponent;
  let fixture: ComponentFixture<RatingPickerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RatingPickerPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingPickerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
