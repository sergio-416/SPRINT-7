import { TestBed } from '@angular/core/testing';

import { Firebase } from './firebase';

describe('Firebase', () => {
  let service: Firebase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Firebase);
  });

it('should provide initialized Auth instance via getAuth', () => {
  const auth = service.getAuth();
  expect(auth).toBeDefined();
  expect(auth.currentUser).toBeDefined();
  expect(auth.currentUser).toBeNull();
});
});
