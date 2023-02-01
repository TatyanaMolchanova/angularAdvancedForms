import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  // searchString = '';
  reactiveSearchString = new FormControl('');

  constructor() { }

  ngOnInit(): void {
    this.reactiveSearchString.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      // ... switchMap(string => ...http.call(string...))
    ).subscribe(console.log);
  }

  // findSomething(search: string) {
  //   console.log(search)
  // }
}
