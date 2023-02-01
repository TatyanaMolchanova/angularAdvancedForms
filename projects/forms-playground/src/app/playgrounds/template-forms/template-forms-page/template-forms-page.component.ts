import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserInfo } from '../../../core/user-info';
import { BanWordsDirective } from '../validators/ban-words.directive';
import { PasswordShouldMatchDirective } from '../validators/password-should-match.directive';
import { UniqueNicknameDirective } from '../validators/unique-nickname.directive';

@Component({
  selector: 'app-template-forms-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BanWordsDirective,
    PasswordShouldMatchDirective,
    UniqueNicknameDirective
  ],
  templateUrl: './template-forms-page.component.html',
  styleUrls: [
    '../../common-page.scss',
    '../../common-form.scss',
    './template-forms-page.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateFormsPageComponent implements OnInit, AfterViewInit {

  userInfo: UserInfo = {
    firstName: 'Dmytro',
    lastName: 'Mezhenskyi',
    nickname: 'dmytro.mezhenkyi',
    email: 'dmytro@decodedfrontend.io',
    yearOfBirth: 1991,
    passport: 'AB123456',
    fullAdress: 'Somestreet 4',
    city: 'Kharkiv',
    postCode: 123456,
    password: '',
    confirmPassword: ''
  }

  @ViewChild(NgForm)
  formDir!: NgForm;

  private initialFormValues: unknown;

  get isAdult() {
    const currentYear = new Date().getFullYear();
    return currentYear - this.userInfo.yearOfBirth >= 18;
  }

  get years() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 40)).fill('').map((_, idx) => now - idx);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    queueMicrotask(() => {
      this.initialFormValues = this.formDir.value;
    })
  }

  onSubmitForm(e: SubmitEvent) {
    console.log('The form has been submitted', this.formDir.value);
    // Strategy 1 - Reset form values, validation statuses, making controls untouched, pristine, etc
    // form.resetForm();
    // Strategy 2 - Reset only control statuses but not values.
    this.formDir.resetForm(this.formDir.value);
    this.initialFormValues = this.formDir.value;
    // console.log('The native submit event', e);

  }

  onReset(e: Event) {
    e.preventDefault();
    this.formDir.resetForm(this.initialFormValues);
  }

}
