import { TestBed } from '@angular/core/testing';

import { UniqueNicknameValidator } from './unique-nickname.validator';

describe('UniqueNicknameService', () => {
  let service: UniqueNicknameValidator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniqueNicknameValidator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
