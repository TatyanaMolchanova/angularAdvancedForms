import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateFormsPageComponent } from './template-forms-page.component';

describe('TemplateFormsPageComponent', () => {
  let component: TemplateFormsPageComponent;
  let fixture: ComponentFixture<TemplateFormsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TemplateFormsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateFormsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
