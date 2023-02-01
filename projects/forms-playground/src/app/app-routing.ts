import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Template-Driven Forms Playground',
    loadComponent:
      () => import('./playgrounds/template-forms/template-forms-page/template-forms-page.component')
        .then(m => m.TemplateFormsPageComponent)
  },
  {
    path: 'reactive-forms',
    title: 'Reactive Forms Playground',
    loadComponent:
      () => import('./playgrounds/reactive-forms/reactive-forms-page/reactive-forms-page.component')
        .then(m => m.ReactiveFormsPageComponent)
  },
  {
    path: 'custom-rating-picker',
    title: 'Custom Rating Picker Playground',
    loadComponent: () => import('./playgrounds/custom-rating-picker/rating-picker-page/rating-picker-page.component')
      .then(m => m.RatingPickerPageComponent)
  },
  {
    path: 'custom-select',
    title: 'Custom Select Component Playground (Advanced)',
    loadComponent: () => import('./playgrounds/custom-select/custom-select-page/custom-select-page.component')
      .then(m => m.CustomSelectPageComponent)
  },
  {
    path: 'dynamic-forms',
    title: 'Dynamic forms Playground',
    loadComponent: () => import('./playgrounds/dynamic-forms/dynamic-forms-page/dynamic-forms-page.component')
      .then(m => m.DynamicFormsPageComponent)
  }
];