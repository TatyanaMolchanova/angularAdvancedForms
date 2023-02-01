import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent, SelectModule } from 'custom-form-controls';
import { User } from '../../../core/user';
import { SelectValue } from 'custom-form-controls';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-select-page',
  standalone: true,
  imports: [CommonModule, SelectModule, ReactiveFormsModule],
  templateUrl: './custom-select-page.component.html',
  styleUrls: [
    '../../common-page.scss',
    './custom-select-page.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomSelectPageComponent implements OnInit {

  selectValue: FormControl<SelectValue<User>> = new FormControl([
    new User(2, 'Niels Bohr', 'niels', 'Denmark'),
    new User(1, 'Albert Einstein', 'albert', 'Germany/USA'),
  ]);
  users: User[] = [
    new User(1, 'Albert Einstein', 'albert', 'Germany/USA'),
    new User(2, 'Niels Bohr', 'niels', 'Denmark'),
    new User(3, 'Marie Curie', 'marie', 'Poland/French'),
    new User(4, 'Isaac Newton', 'isaac', 'United Kingdom'),
    new User(5, 'Stephen Hawking', 'stephen', 'United Kingdom', true),
    new User(6, 'Max Planck', 'max', 'Germany'),
    new User(7, 'James Clerk Maxwell', 'james', 'United Kingdom'),
    new User(8, 'Michael Faraday', 'michael', 'United Kingdom'),
    new User(9, 'Richard Feynman', 'richard', 'USA'),
    new User(10, 'Ernest Rutherford', 'ernest', 'New Zealand'),
  ];
  filteredUsers = this.users;

  // @ViewChild(SelectComponent) select!: SelectComponent<User>;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.select.open();
    // }, 3000);
    this.selectValue.valueChanges.subscribe(this.onSelectionChanged);
  }

  onSearchChanged(queryString: string) {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().startsWith(queryString.toLowerCase()))
  }

  displayWithFn(user: User) {
    return user.name;
  }

  compareWithFn(user: User | null, user2: User | null) {
    return user?.id === user2?.id;
  }

  onSelectionChanged(value: unknown) {
    console.log('Selected value: ', value);
  }
}
