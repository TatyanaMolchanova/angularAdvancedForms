import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSkillsService {

  constructor() { }

  getSkills() {
    return of(['angular', 'typescript', 'git', 'docker']).pipe(
      delay(1000)
    )
  }

}
