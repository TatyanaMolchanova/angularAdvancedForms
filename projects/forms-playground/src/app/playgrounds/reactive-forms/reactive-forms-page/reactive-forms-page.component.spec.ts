import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsPageComponent } from './reactive-forms-page.component';

describe('ReactiveFormsPageComponent', () => {
  let component: ReactiveFormsPageComponent;
  let fixture: ComponentFixture<ReactiveFormsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveFormsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
