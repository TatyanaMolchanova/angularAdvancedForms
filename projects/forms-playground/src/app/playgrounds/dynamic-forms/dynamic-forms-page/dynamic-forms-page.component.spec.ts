import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormsPageComponent } from './dynamic-forms-page.component';

describe('DynamicFormsPageComponent', () => {
  let component: DynamicFormsPageComponent;
  let fixture: ComponentFixture<DynamicFormsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DynamicFormsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicFormsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
