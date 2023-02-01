import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroupDirective, FormBuilder, FormControl, FormGroup, FormRecord, ReactiveFormsModule, Validators } from '@angular/forms';
import { bufferCount, filter, Observable, startWith, Subscription, tap } from 'rxjs';
import { UserSkillsService } from '../../../core/user-skills.service';
import { banWords } from '../validators/ban-words.validator';
import { passwordShouldMatch } from '../validators/password-should-match.validator';
import { UniqueNicknameValidator } from '../validators/unique-nickname.validator';

@Component({
  selector: 'app-reactive-forms-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-forms-page.component.html',
  styleUrls: [
    '../../common-page.scss',
    '../../common-form.scss',
    './reactive-forms-page.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactiveFormsPageComponent implements OnInit, OnDestroy {

  phoneLabels = ['Main', 'Mobile', 'Work', 'Home'];
  years =  this.getYears();
  skills$!: Observable<string[]>;

  form = this.fb.group({
    firstName: ['Dmytro', [Validators.required, Validators.minLength(4), banWords(['test', 'dummy'])]],
    lastName: ['Mezhenskyi', [Validators.required, Validators.minLength(2)]],
    nickname: ['',
    {
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[\w.]+$/),
        banWords(['dummy', 'anonymous'])
      ],
      asyncValidators: [
        this.uniqueNickname.validate.bind(this.uniqueNickname)
      ],
      updateOn: 'blur'
    },

  ],
    email: ['dmytro@decodedfrontend.io', [Validators.email, Validators.required]],
    yearOfBirth: this.fb.nonNullable.control(
      this.years[this.years.length - 1],
      Validators.required
    ),
    passport: ['', [Validators.pattern(/^[A-Z]{2}[0-9]{6}$/)]],
    address: this.fb.nonNullable.group({
      fullAddress: ['', Validators.required],
      city: ['', Validators.required],
      postCode: [0, Validators.required]
    }),
    phones: this.fb.array([
      this.fb.group({
        label: this.fb.nonNullable.control(this.phoneLabels[0]),
        phone: ''
      })
    ]),
    skills: this.fb.record<boolean>({}),
    password: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ''
    }, {
      validators: passwordShouldMatch
    })
  });

  private ageValidators!: Subscription;
  private formPendingState!: Subscription;

  private initialFormValues: any;

  @ViewChild(FormGroupDirective)
  private formDir!: FormGroupDirective

  constructor(
    private userSkills: UserSkillsService,
    private fb: FormBuilder,
    private uniqueNickname: UniqueNicknameValidator,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.skills$ = this.userSkills.getSkills().pipe(
      tap(skills => this.buildSkillControls(skills)),
      tap(() => this.initialFormValues = this.form.value)
    );
    this.ageValidators = this.form.controls.yearOfBirth.valueChanges.pipe(
      tap(() => this.form.controls.passport.markAsDirty()),
      startWith(this.form.controls.yearOfBirth.value)
    ).subscribe(
      yearOfBirth => {
        this.isAdult(yearOfBirth)
          ? this.form.controls.passport.addValidators(Validators.required)
          : this.form.controls.passport.removeValidators(Validators.required);
        this.form.controls.passport.updateValueAndValidity();
      }
    );
    this.formPendingState = this.form.statusChanges.pipe(
      bufferCount(2, 1),
      filter(([prevState]) => prevState === 'PENDING')
    ).subscribe(() => this.cd.markForCheck())
  }

  ngOnDestroy(): void {
    this.ageValidators.unsubscribe();
    this.formPendingState.unsubscribe();
  }

  addPhone() {
    this.form.controls.phones.insert(0,
      new FormGroup({
        label: new FormControl(this.phoneLabels[0], { nonNullable: true }),
        phone: new FormControl('')
      })
    )
  }

  removePhone(index: number) {
    this.form.controls.phones.removeAt(index);
  }

  onSubmit(e: Event) {
    console.log(this.form.value);
    this.initialFormValues = this.form.value;
    this.formDir.resetForm(this.form.value);
  }

  onReset(e: Event) {
    e.preventDefault();
    this.formDir.resetForm(this.initialFormValues);
  }

  private getYears() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 40)).fill('').map((_, idx) => now - idx);
  }

  private buildSkillControls(skills: string[]) {
    skills.forEach(skill =>
      this.form.controls.skills.addControl(
        skill,
        new FormControl(false, { nonNullable: true })
      )
    );
  }

  private isAdult(yearOfBirth: number): boolean {
    const currentYear = new Date().getFullYear();
    return currentYear - yearOfBirth >= 18;
  }

}
